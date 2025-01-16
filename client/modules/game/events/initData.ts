import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { GameReport, Permission, Player, Staff } from "@common/types";
import { game } from "..";

onNet("FivemReportSystem:client:initData", async () => {
    const staff: Staff = await callbacks.triggerServerCallback("getStaff");

    if (!staff) return;

    const reports: GameReport[] = await callbacks.triggerServerCallback("getReports");
    const players: Player[] = await callbacks.triggerServerCallback("getPlayers");
    const permission: Permission = await callbacks.triggerServerCallback("getPermissions");
    const discordId: string | null = await callbacks.triggerServerCallback("getDiscordId");

    nuiManager.SendReactMessage("setPermission", permission);
    
    if (discordId)
        nuiManager.SendReactMessage("setMyDiscordId", discordId);

    game.reportManager.setReports(reports);
    game.playerManager.updatePlayers(players);
});