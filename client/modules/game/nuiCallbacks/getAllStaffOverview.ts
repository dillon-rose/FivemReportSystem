import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { StaffStatsOverview, Time } from "@common/types";

nuiManager.registerNuiCallback<{ time: Time }>("getAllStaffOverview", async (data, cb) => {
    const { time } = data;

    const allStaff = await callbacks.triggerServerCallback<StaffStatsOverview[]>("getAllStaffOverview", time);

    cb(allStaff);
}, true);