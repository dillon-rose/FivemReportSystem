import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { Time } from "@common/types";

nuiManager.registerNuiCallback<{ discordId: string, time: Time }>("getStaffPlaytime", async (data, cb) => {
    const { discordId, time } = data;

    const staffPlaytime = await callbacks.triggerServerCallback("getStaffPlaytime", discordId, time);

    cb(staffPlaytime);
}, true);