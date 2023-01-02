const { room } = require("../client.js");
const _room = require("../room.js");
const { localconsts } = require("./localconsts.js");
const { game } = require("./game.js");


function setupControls() {

    document.addEventListener("keydown", (e) => {
        controlsDown(e.code, true);
    });

    document.addEventListener("keyup", (e) => {
        controlsDown(e.code, false);
    });

}
exports.setupControls = setupControls;

function controlsDown(code, press) {
    let cmd = (press) ? "press" : "release";
    let call = `player-key-${cmd}`;
    switch (code) {
        case localconsts.controls.jump:
            _room.send(call, "up");
            playerHandleControl(press, "up");
            return;
        case localconsts.controls.moveLeft:
            _room.send(call, "left");
            playerHandleControl(press, "left");
            return;
        case localconsts.controls.moveRight:
            _room.send(call, "right");
            playerHandleControl(press, "right");
            return;
        case localconsts.controls.moveDown:
            _room.send(call, "down");
            playerHandleControl(press, "down");
            return;
        case localconsts.controls.action:
            _room.send(call, "action");
            playerHandleControl(press, "action");
            return;
    }
}
function playerHandleControl(press, msg) {
    if (press) {
        playerHandlePress(msg);
    }
    else {
        playerHandleRelease(msg);
    }
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