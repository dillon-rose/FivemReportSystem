import DBManager from "@server/modules/database/models/DBManager";
import { game } from "..";

on("playerDropped", async (_: string) => {
    const source = global.source;

    const player = game.playerManager.getPlayer(source);

    if (player) {
        const reportNumber = player.reportNumber;

        if (reportNumber != undefined) {
            await game.reportManager.removePrimaryFromReport(reportNumber);
        }
    }

    const staff = game.playerManager.getInGameStaff(source);

    if (staff) {
        await DBManager.addStaffSession(staff.discordId, player?.joinTime || Date.now(), (player?.sessionLength || 0));
    }
    
    game.playerManager.playerLeft(source);
});