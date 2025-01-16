import { callbacks } from "@server/modules/callbacks";
import { game } from "..";
import Config from "@server/sv_config";
import { Permission } from "@common/types";

callbacks.registerServerCallback("getPermissions", async (source: number) => {
    const staff = game.playerManager.getInGameStaff(source);

    if (!staff) return Permission.UNAUTHORIZED;

    return Config.STAFF_ROLES[staff.rank] || Permission.UNAUTHORIZED;
});