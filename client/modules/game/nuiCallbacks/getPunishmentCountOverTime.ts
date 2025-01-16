import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { Time } from "@common/types";

nuiManager.registerNuiCallback<{ time: Time }>("getPunishmentCountOverTime", async (data, cb) => {
    const reportTimes: number[] = await callbacks.triggerServerCallback("getPunishmentCountOverTime", data.time);

    cb(reportTimes);
}, true);
