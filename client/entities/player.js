const PIXI = require("pixi.js-legacy");
const { sharedconsts } = require("../../shared/sharedconsts.js");
const _canvas = require("../graphics/canvas.js");
const { Entity } = require("./entity.js");

class Player extends Entity {
    constructor(sessionId) {
        super();

        this.sessionId = sessionId;

        this.width = sharedconsts.player.hitboxWidth;
        this.height = sharedconsts.player.hitboxHeight;
        this.facingLeft = false;

        this.moveSpeed = 0;

        this.trueX = this.x;
        this.trueY = this.y;

        this.actions = {
            up: false,
            down: false,
            left: false,
            right: false,
            action: false,
            moonwalkLeft: false,
            moonwalkRight: false,
        };
    
        this.released = {
            up: true,
            down: true,
            left: true,
            right: true,
            action: true,
        }

        // player graphics
        this.graphics = new PIXI.Graphics();
    }

    addToCanvas() {
        _canvas.canvas.stage.addChild(this.graphics);
    }
    removeFromCanvas() {
        _canvas.canvas.stage.removeChild(this.graphics);
    }

    draw() {
        this.graphics.clear();

        this.graphics.position.set(this.x, this.y);

        this.graphics.beginFill(0xFFFF00);
        this.graphics.lineStyle(2, 0xFF0000);

        this.graphics.drawRect(0, 0, this.width, this.height);

        this.graphics.endFill();
    }

    update(mult) {
        this.movement(mult);
        super.update(mult);

    }
    movement(mult) {
        let accel = this.actions.left || this.actions.right;
        let moonwalk = this.actions.moonwalkLeft || this.actions.moonwalkRight;
    
        if ((this.actions.moonwalkLeft || this.actions.right) && !this.actions.moonwalkRight) {
            this.facingLeft = false;
        }
        else if (this.actions.moonwalkRight || this.actions.left) {
            this.facingLeft = true;
        }
    
        if (accel) {
            this.moveSpeed += sharedconsts.player.moveSpeedAccumulation * mult;
            if (this.moveSpeed > sharedconsts.player.moveSpeedMax) {
                this.moveSpeed = sharedconsts.player.moveSpeedMax;
            }
        }
        else if (this.moveSpeed > 0) {
            this.moveSpeed -= sharedconsts.player.moveSpeedFalloff * mult;
            if (this.moveSpeed < 0) {
                this.moveSpeed = 0;
            }
        }
    
        if ((this.facingLeft && !this.actions.moonwalkRight) || this.actions.moonwalkLeft) {
            this.velX = -this.moveSpeed;
        }
        else if ((!this.facingLeft && !this.actions.moonwalkLeft) || this.actions.moonwalkRight) {
            this.velX = this.moveSpeed;
        }
    
        if (this.actions.up) {
            if (this.released.up && this.onGround) {
                this.velY = sharedconsts.player.jumpVelocity;
                this.onGround = false;
            }
            this.released.up = false;
        }
    }

}
exports.Player = Player;