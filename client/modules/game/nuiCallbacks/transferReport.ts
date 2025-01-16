import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { game } from "..";

nuiManager.registerNuiCallback<{ reportNumber: number, targetStaff: string }>("transferReport", async (data, cb) => {
    const success = callbacks.triggerServerCallback("transferReport", data.reportNumber, data.targetStaff);

    cb(success);
});