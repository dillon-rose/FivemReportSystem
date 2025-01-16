import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { Statuses } from "@common/types";

nuiManager.registerNuiCallback<{ reportNumber: number, status: Statuses }>("updateReportStatus", async (data, cb) => {
    const success = callbacks.triggerServerCallback("updateReportStatus", data.reportNumber, data.status);

    cb(success);
});