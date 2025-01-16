import { callbacks } from "@server/modules/callbacks";
import { game } from "..";
import { info } from "@server/utils/notify";

callbacks.registerServerCallback("transferReport", async (source, reportNumber: number, newPrimaryDiscordId: string) => {
    const staff = game.playerManager.getInGameStaff(source);

    if (!staff) return false;

    const res = await game.reportManager.transferReport(reportNumber, source, newPrimaryDiscordId);

    return res;
});