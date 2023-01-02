const { sharedconsts } = require("../../shared/sharedconsts.js");
const { Player } = require("../entities/player.js");
const { canvas } = require("../graphics/canvas.js");
const { options } = require("./options.js");

class Game {
    constructor() {
        this.players = {};
        this.inputHistory = {};
    }

    addPlayer(id) {
        if (id === undefined) {
            return;
        }
        this.players[id] = new Player(id);
        
        this.players[id].addToCanvas();

        console.log(`Added player ${id}`);

        return this.players[id];
    }

    removePlayer(id) {
        if (this.players[id]) {
            
            this.players[id].removeFromCanvas();
            delete this.players[id];

            console.log(`Removed player ${id}`);
        }
    }

    getPlayer(id) {
        return this.players[id];
    }

    loop(delta) {
        let mult = sharedconsts.room.tickRate * delta / 60;
        for (let id in this.players) {
            if (options.clientsidePrediction) {
                this.players[id].update(mult);
            }
            this.players[id].draw();
        }
    }

    start() {
        canvas.ticker.add((delta) => {this.loop(delta);});
    }

    stop() {

        for (let id in this.players) {
            this.players[id].removeFromCanvas();
        }

        canvas.ticker.remove((delta) => {this.loop(delta);});
    }
}

exports.game = new Game();