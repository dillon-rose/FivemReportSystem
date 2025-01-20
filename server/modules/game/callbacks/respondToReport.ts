import { callbacks } from "@server/modules/callbacks";
import { game } from "..";

callbacks.registerServerCallback("respondToReport", async (source, reportNumber) => {
    const staff = game.playerManager.getInGameStaff(source);

    if (!staff) return false;
    
    game.reportManager.respondToReport(reportNumber, source);
})