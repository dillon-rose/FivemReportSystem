import { nuiManager } from "@client/modules/nui";
import { game } from "..";

nuiManager.registerNuiCallback("getPlayers", async (_, cb) => {
    const players = game.playerManager.getPlayers();

    cb(players);
}, true);