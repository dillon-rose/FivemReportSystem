import { callbacks } from "@server/modules/callbacks";
import DBManager from "../models/DBManager";
import { game } from "@server/modules/game";

callbacks.registerServerCallback("getStaffPlaytime", async (source, discordId, time) => {
    const staffPlaytime = await DBManager.getStaffSessions(discordId, time);
    const staff = await game.playerManager.getInGameStaffByDiscord(discordId);
    const player = await game.playerManager.getPlayer(staff?.id || -1);

    if (!staff || !player) return staffPlaytime;

    staffPlaytime.sessions.push({
        length: player.sessionLength / 60,
        startTime: player.joinTime,
    });
    
    return staffPlaytime;
});