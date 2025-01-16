import { callbacks } from "@server/modules/callbacks";
import { game } from "..";
import { Results } from "@common/types";

callbacks.registerServerCallback("solveReport", async (source, reportNumber: number, result: Results) => {
    const staff = game.playerManager.getInGameStaff(source);

    if (!staff) return false;

    const res = game.reportManager.solveReport(reportNumber, source, result);

    return res;
});