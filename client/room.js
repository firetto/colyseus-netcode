const _client = require("./client.js");
const _player = require("./entities/player.js");
const { game } = require("./game/game.js");

let room = _client.room;

function onJoin() {
    room = _client.room;
    
    room.state.players.onAdd = (player, id) => {
    
        // add player to world
        game.addPlayer(id);
        
        // If you want to track changes on a child object inside a map, this is a common pattern:
        player.onChange = function(changes) {
            if (!game.getPlayer(id)) {
                return;
            }
            let p = game.getPlayer(id);
            changes.forEach(change => {
                switch (change.field) {
                    case "x":
                        p.x = change.value;
                        break;
                    case "y":
                        p.y = change.value;
                        break;
                }
            });
        };
        
        // force "onChange" to be called immediatelly
        player.triggerAll();

    };

    // on player remove
    room.state.players.onRemove = (player, id) => {
        _player.removePlayer(id);
    };
}
exports.onJoin = onJoin;

function send(type, message) {
    if (_client.room != null) {
        _client.room.send(type, message);
    }
    else {
        console.log("Client is not connected to room, cannot send message.");
    }
    
}
exports.send = send;

function getSessionId() {
    return _client.room.sessionId;
}
exports.getSessionId = getSessionId;