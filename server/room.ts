import http from "http";
import { Room, Client } from "colyseus";

import { Player, State } from "./state";

import * as _entity from "./entity";
import * as _player from "./player";
import * as _game from "./game";

import { sharedconsts } from "../shared/sharedconsts";

export class GameRoom extends Room {
    entity_updatePhysics: any;
    player_loop: any;
    player_movement: any;
    game_loop: any;
    game_start: any;
    game_stop: any;

    onCreate(options: any) {
        // @ts-ignore
        this.entity_updatePhysics = _entity.entity_updatePhysics;
        // @ts-ignore
        this.player_loop = _player.player_loop;
        // @ts-ignore
        this.player_movement = _player.player_movement;
        // @ts-ignore
        this.game_loop = _game.game_loop;
        // @ts-ignore
        this.game_start = _game.game_start;
        // @ts-ignore
        this.game_stop = _game.game_stop;

        this.setState(new State());

        this.setPatchRate(1000/sharedconsts.room.tickRate);

        this.setSimulationInterval();


        this.onMessage("player-key-press", (client, msg) => {
            let p = this.state.players[client.sessionId];
            if (p.actions.hasOwnProperty(msg)) {
                p.actions[msg] = true;

                if (msg === "left" && p.actions.right) {
                    p.actions.moonwalkRight = true;
                }
                else if (msg === "right" && p.actions.left) {
                    p.actions.moonwalkLeft = true;
                }
            }
        });
        this.onMessage("player-key-release", (client, msg) => {
            let p = this.state.players[client.sessionId];
            if (p.actions.hasOwnProperty(msg)) {
                p.actions[msg] = false;
                p.released[msg] = true;

                if (msg === "left" || msg === "right") {
                    p.actions.moonwalkLeft = false;
                    p.actions.moonwalkRight = false;
                }
            }
        });



        console.log("Room created!");

        this.game_start();

        
    }

    onAuth(client: Client, options: any, request: http.IncomingMessage) {
        return true;
    }

    onJoin(client: Client, options: any, auth: any) {
        console.log(`Client ${client.sessionId} joined room ${this.roomId}`);
        this.state.players.set(client.sessionId, new Player());
    }

    onLeave(client: Client, consented: boolean) {
        console.log(`Client ${client.sessionId} left room ${this.roomId}. Consent: ${consented}`);
    
        this.state.players.delete(client.sessionId);
    }
    
    onDispose() {
        console.log(`Room ${this.roomId} removed`);
    }
}