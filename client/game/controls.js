const { room } = require("../client.js");
const _room = require("../room.js");
const { localconsts } = require("./localconsts.js");
const { game } = require("./game.js");

let codeToMsg = {};
let pressed = {
    up: false,
    left: false,
    right: false,
    down: false,
    action: false,
};

function setupControls() {

    codeToMsg[localconsts.controls.jump] = "up";
    codeToMsg[localconsts.controls.moveLeft] = "left";
    codeToMsg[localconsts.controls.moveRight] = "right";
    codeToMsg[localconsts.controls.moveDown] = "down";
    codeToMsg[localconsts.controls.action] = "action";
    
    document.addEventListener("keydown", (e) => {
        controlsDown(e.code, true);
    });

    document.addEventListener("keyup", (e) => {
        controlsDown(e.code, false);
    });

}
exports.setupControls = setupControls;

function controlsDown(code, press) {
    playerHandleControl(press, codeToMsg[code]);
    
}
function playerHandleControl(press, msg) {
    if (pressed[msg] != press) {
        let cmd = (press) ? "press" : "release";
        let call = `player-key-${cmd}`;
        _room.send(call, {
            msg: msg,
            tick: game.elapsedTicks,
        });
        
        if (press) {
            playerHandlePress(msg);
        }
        else {
            playerHandleRelease(msg);
        }
        game.inputHistory.enqueue({
            press: press,
            msg: msg,
            tick: game.elapsedTicks,
            player: game.getThisPlayer().copy(),
        });
    }
    pressed[msg] = press;
}
function playerHandlePress(msg) {
    let p = game.getPlayer(_room.getSessionId());
    if (p.actions.hasOwnProperty(msg)) {
        p.actions[msg] = true;

        if (msg === "left" && p.actions.right) {
            p.actions.moonwalkRight = true;
        }
        else if (msg === "right" && p.actions.left) {
            p.actions.moonwalkLeft = true;
        }
    }
}
function playerHandleRelease(msg) {
    let p = game.getPlayer(_room.getSessionId());
    if (p.actions.hasOwnProperty(msg)) {
        p.actions[msg] = false;
        p.released[msg] = true;

        if (msg === "left" || msg === "right") {
            p.actions.moonwalkLeft = false;
            p.actions.moonwalkRight = false;
        }
    }
}