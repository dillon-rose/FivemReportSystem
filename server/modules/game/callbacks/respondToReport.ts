import { callbacks } from "@server/modules/callbacks";
import { game } from "..";

callbacks.registerServerCallback("respondToReport", async (source, reportNumber) => {
    const staff = game.playerManager.getInGameStaff(source);

    if (!staff) return false;
    
    const shouldTeleport = await game.reportManager.respondToReport(reportNumber, source);

    if (!shouldTeleport) return false;

    const report = game.reportManager.getReport(reportNumber);

    const creator = GetPlayerPed(report.creator.id.toString());
    const creatorCoords = GetEntityCoords(creator);

    SetEntityCoords(GetPlayerPed(source.toString()), creatorCoords[0], creatorCoords[1], creatorCoords[2], false, false, false, false);

    return true;
})