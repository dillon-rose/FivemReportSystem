import { Permission } from "@common/types";

const Config = {
    // [discord role name]: [permission level]
    STAFF_ROLES: {
        "Executive Staff": Permission.ADMIN,
        "Senior Administrator": Permission.ADMIN,
        "Administrator": Permission.MODERATOR,
        "Senior Moderator": Permission.USER,
        "Moderator": Permission.USER,
        "Trial Moderator": Permission.USER,
    },

    // time a person stays on the player list after leaving
    LEAVE_TIMEOUT: 1000 * 60 * 5,

    PLAYER_UPDATE_INTERVAL: 1000 * 60,

    BOT_TOKEN: "",
    MAIN_GUILD_ID: "",
    STAFF_ROLE_ID: "",

    SCREENSHOT_DUMP_WEBHOOK: ""
} as const;

export default Config;

export type TStaffRoles = typeof Config.STAFF_ROLES;
export type TStaffRole = keyof TStaffRoles;