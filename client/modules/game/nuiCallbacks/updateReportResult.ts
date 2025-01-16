import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { Results } from "@common/types";

nuiManager.registerNuiCallback<{ reportNumber: number, result:  Results }>("updateReportResult", async (data, cb) => {
    const success = callbacks.triggerServerCallback("updateReportResult", data.reportNumber, data.result);

    cb(success);
});