import { GameReport } from "@common/types";
import { game } from "..";

onNet("FivemReportSystem:client:newReport", async (report: GameReport) => {
    game.reportManager.addReport(report);
});