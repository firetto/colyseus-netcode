const { sharedconsts } = require("../../shared/sharedconsts.js");
const { options } = require("../game/options.js");

class Entity {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.velX = 0;
        this.velY = 0;
        this.accelX = 0;
        this.accelY = 0;
        this.gravityAffected = true;
        this.width = 0;
        this.height = 0;
        this.onGround = false;
    }
    
    update(mult) {
        if (this.gravityAffected) {
            if (this.onGround) {
                this.velY = 0;
                this.accelY = 0;
            }
            else {
                this.accelY = sharedconsts.world.accelGravity;
            }
        }
        
        this.velX += this.accelX * mult;
        this.velY += this.accelY * mult;
        this.x += this.velX * mult;
        this.y += this.velY * mult;
    
        if (this.y + this.height > sharedconsts.world.height) {
            this.velY = 0;
            this.y = sharedconsts.world.height - this.height;
            this.onGround = true;
        }
    }
}
exports.Entity = Entity;