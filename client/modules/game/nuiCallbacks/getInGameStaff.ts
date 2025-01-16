import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";

nuiManager.registerNuiCallback<{ playerId: number }>("getInGameStaff", async (data, cb) => {
    const staff = await callbacks.triggerServerCallback("getInGameStaff", data.playerId);

    cb(staff);
});