import { callbacks } from "@server/modules/callbacks";
import { game } from "..";

callbacks.registerServerCallback("getPlayers", async () => {
    const players = game.playerManager.getPlayers();

    return Array.from(players.values());
});