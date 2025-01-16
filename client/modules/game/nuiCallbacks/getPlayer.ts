import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";

nuiManager.registerNuiCallback<{ playerId: number }>("getPlayer", async (data, cb) => {
    const { playerId } = data;

    if (playerId < 1) return cb(null);

    const player = await callbacks.triggerServerCallback("getPlayer", playerId);
    cb(player);
}, true);