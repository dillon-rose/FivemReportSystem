import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { TReport } from "@common/types";

nuiManager.registerNuiCallback<{ playerHex: string }>("getPlayerReports", async (data, cb) => {
    const { playerHex } = data;

    const reports = await callbacks.triggerServerCallback<TReport[]>("getPlayerReports", playerHex);

    cb(reports);
}, true);