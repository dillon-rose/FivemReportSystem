import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { Time } from "@common/types";

nuiManager.registerNuiCallback<{ discordId: string, time: Time }>("getStaff", async (data, cb) => {
    const { discordId, time } = data;

    const staffStats = await callbacks.triggerServerCallback("getStaffStats", discordId, time);

    cb(staffStats);
}, true);