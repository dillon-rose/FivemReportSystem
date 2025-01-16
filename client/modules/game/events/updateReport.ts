import { GameReport } from "@common/types";
import { game } from "..";

onNet("FivemReportSystem:client:updateReport", async (reportId: number, report: GameReport) => {
    game.reportManager.updateReport(reportId, report);
});