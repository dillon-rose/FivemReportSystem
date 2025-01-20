import { callbacks } from "@server/modules/callbacks";
import { game } from "..";
import { InGameStaff, Statuses } from "@common/types";
import { error, success } from "@server/utils/notify";

callbacks.registerServerCallback("updateReportStatus", async (source: number, reportNumber: number, status: Statuses) => {
    const staff = game.playerManager.getInGameStaff(source);
    
    if (!staff) return false;
    
    const player = game.playerManager.getPlayer(source);
    
    if (!player) return false;
    
    if (player.reportNumber !== undefined && player.reportNumber !== reportNumber) {
        error(source, "You are already handling a report. Finish that one first.");
        return false;
    }
    
    const report = game.reportManager.getReport(reportNumber);
    
    if (!report) return false;

    // we only want to update solved reports and we don't want to make them unsolved
    if (status === Statuses.UNSOLVED || report.status !== Statuses.SOLVED) return false;

    if (!report.attatchedStaff.find(response => response.staff.discordId === staff.discordId) && report.primaryStaff?.staff.discordId !== staff.discordId) {
        error(source, "You have to be attatched to the report to change its status.");
        return false;
    }

    report.solvedBy = undefined;
    await game.reportManager.transferReport(reportNumber, staff.id, staff.discordId);
    game.playerManager.setActiveReport(staff.id, reportNumber);

    report.status = status;

    game.reportManager.updateReport(reportNumber, report);

    return true;
});