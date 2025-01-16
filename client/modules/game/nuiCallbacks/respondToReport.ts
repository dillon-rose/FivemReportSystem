import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";

nuiManager.registerNuiCallback<{ reportNumber: number }>("respondToReport", async (data, cb) => {
    const success = callbacks.triggerServerCallback("respondToReport", data.reportNumber);

    cb(success);
});