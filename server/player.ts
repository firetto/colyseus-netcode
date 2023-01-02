import { State, Player, Entity } from "./state";
import { sharedconsts } from "../shared/sharedconsts"; 


export function player_loop(p: Player) {

    this.player_movement(p);

    this.entity_updatePhysics(p);
}   

export function player_movement(p: Player) {
    let accel = p.actions.left || p.actions.right;
    let moonwalk = p.actions.moonwalkLeft || p.actions.moonwalkRight;

    if ((p.actions.moonwalkLeft || p.actions.right) && !p.actions.moonwalkRight) {
        p.facingLeft = false;
    }
    else if (p.actions.moonwalkRight || p.actions.left) {
        p.facingLeft = true;
    }

    if (accel) {
        p.moveSpeed += sharedconsts.player.moveSpeedAccumulation;
        if (p.moveSpeed > sharedconsts.player.moveSpeedMax) {
            p.moveSpeed = sharedconsts.player.moveSpeedMax;
        }
    }
    else if (p.moveSpeed > 0) {
        p.moveSpeed -= sharedconsts.player.moveSpeedFalloff;
        if (p.moveSpeed < 0) {
            p.moveSpeed = 0;
        }
    }

    if ((p.facingLeft && !p.actions.moonwalkRight) || p.actions.moonwalkLeft) {
        p.velX = -p.moveSpeed;
    }
    else if ((!p.facingLeft && !p.actions.moonwalkLeft) || p.actions.moonwalkRight) {
        p.velX = p.moveSpeed;
    }

    if (p.actions.up) {
        if (p.released.up && p.onGround) {
            p.velY = sharedconsts.player.jumpVelocity;
            p.onGround = false;
        }
        p.released.up = false;
    }
}