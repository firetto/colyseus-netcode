const PIXI = require("pixi.js-legacy");

const canvas = new PIXI.Application({
    view: document.getElementById("game-canvas"),
    width: 800,
    height: 600,
    backgroundColor: 0xffffff,
    antialias: true,
}); 
exports.canvas = canvas;

exports.setup = function() {
    document.getElementById("game-wrapper").appendChild(canvas.view);
}