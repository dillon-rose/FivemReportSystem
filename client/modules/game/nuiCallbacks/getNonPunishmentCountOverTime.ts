import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { Time } from "@common/types";

nuiManager.registerNuiCallback<{ time: Time }>("getNonPunishmentCountOverTime", async (data, cb) => {
    const reportTimes: number[] = await callbacks.triggerServerCallback("getNonPunishmentCountOverTime", data.time);

    cb(reportTimes);
}, true);
