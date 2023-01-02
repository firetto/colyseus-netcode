import { Entity } from "./state";
import { sharedconsts } from "../shared/sharedconsts";

// do one update tick
export function entity_updatePhysics(e: Entity) {
    if (e.gravityAffected) {
        if (e.onGround) {
            e.velY = 0;
            e.accelY = 0;
        }
        else {
            e.accelY = sharedconsts.world.accelGravity;
        }
    }
    
    e.velX += e.accelX;
    e.velY += e.accelY;
    e.x += e.velX;
    e.y += e.velY;

    if (e.y + e.height > sharedconsts.world.height) {
        e.velY = 0;
        e.y = sharedconsts.world.height - e.height;
        e.onGround = true;
    }
}