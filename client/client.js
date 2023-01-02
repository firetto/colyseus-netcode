const _colyseus = require("colyseus.js");
const _room = require("./room.js");
const { game } = require("./game/game.js");

let client = new _colyseus.Client("ws://localhost:3000");

exports.room = null;

function joinRoom(room) {
  exports.room = room;
  _room.onJoin();
  
  game.start();
}

function joinOrCreateRoom() {
  client.joinOrCreate("battle", {/* options */}).then(room => {
    console.log("joined successfully", room);
    
    joinRoom(room);

  }).catch(e => {
    console.error("join error", e);
  });
}
exports.joinOrCreateRoom = joinOrCreateRoom;