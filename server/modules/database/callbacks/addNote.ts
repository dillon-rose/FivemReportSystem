import { TRating } from "@common/types";
import { callbacks } from "@server/modules/callbacks";
import { game } from "@server/modules/game";
import DBManager from "../models/DBManager";

callbacks.registerServerCallback("addNote", async (source: number, reportNumber: number | null, staffId: string, rating: TRating, note: string) => {
    const staff = game.playerManager.getInGameStaff(source);
    
    if (!staff) return;

    const report = reportNumber ? game.reportManager.getReport(reportNumber) : null;

    return await DBManager.addNote(report?.id || null, staff.discordId, staffId, rating, note);
});