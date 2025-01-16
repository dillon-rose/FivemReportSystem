import { nuiManager } from "@client/modules/nui";
import { game } from "..";

nuiManager.registerNuiCallback("getPlayerCount", async (_, cb) => {
    const playerCount = game.playerManager.getPlayerCount();
    const maxPlayers = GetConvarInt("sv_maxclients", 100);

    cb({
        players: playerCount,
        maxPlayers
    });
}, true);