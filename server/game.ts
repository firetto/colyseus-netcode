import { sharedconsts } from "../shared/sharedconsts";

import { State, Player, Entity } from "./state";

export function game_loop() {
    this.state.players.forEach((player: Player, id) => {
        this.player_loop(player);
    });
}

export function game_start() {
    // start timer
    this.clock.setInterval(()=>{this.game_loop()}, 1000/sharedconsts.room.tickRate);
}

export function game_stop() {
    this.clock.clear();
}