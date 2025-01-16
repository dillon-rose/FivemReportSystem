import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { Permission, Staff } from "@common/types";

nuiManager.registerNuiCallback("getInitData", async (_, cb) => {
    const staff: Staff = await callbacks.triggerServerCallback("getStaff");
    
    if (!staff) return cb(null);

    const permission: Permission = await callbacks.triggerServerCallback("getPermissions");
    const discordId: string = await callbacks.triggerServerCallback("getDiscordId");

    cb({ permission, discordId });
});