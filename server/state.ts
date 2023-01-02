import { sharedconsts } from "../shared/sharedconsts";
import { Schema, MapSchema, ArraySchema, type } from "@colyseus/schema";

export class Entity extends Schema {

    @type("number")
    x: number = 0;

    @type("number")
    y: number = 0;

    @type("boolean")
    onGround: boolean = false;

    @type("number")
    width: number;

    @type("number")
    height: number;

    velX: number = 0;
    velY: number = 0;
    accelX: number = 0;
    accelY: number = 0;

    gravityAffected: boolean = true;
}

export class Player extends Entity {

    
    @type("boolean")
    facingLeft: boolean = false;

    actions: any = {
        up: false,
        down: false,
        left: false,
        right: false,
        action: false,
        moonwalkLeft: false,
        moonwalkRight: false,
    };

    released: any = {
        up: true,
        down: true,
        left: true,
        right: true,
        action: true,
    }

    width = sharedconsts.player.hitboxWidth;
    height = sharedconsts.player.hitboxHeight;

    moveSpeed: number = 0;
}

export class Projectile extends Entity {
    gravityAffected = false;
}

export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();
    @type({ map: Projectile })
    projectiles = new MapSchema<Projectile>();
}