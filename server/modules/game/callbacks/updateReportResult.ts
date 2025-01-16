import { callbacks } from "@server/modules/callbacks";
import { game } from "..";
import { Results } from "@common/types";

callbacks.registerServerCallback("updateReportResult", async (source: number, reportNumber: number, result: Results) => {
    const staff = game.playerManager.getInGameStaff(source);

    if (!staff) return false;

    const report = game.reportManager.getReport(reportNumber);

    if (!report) return false;

    report.result = result;

    game.reportManager.updateReport(reportNumber, report);

    return true;
});