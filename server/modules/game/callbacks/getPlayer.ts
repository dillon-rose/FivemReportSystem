import { callbacks } from "@server/modules/callbacks";
import { game } from "..";

callbacks.registerServerCallback("getPlayer", async (source, playerId: number) => {
    const player = game.playerManager.getPlayer(playerId);
    
    return player;
});