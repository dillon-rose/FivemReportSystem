import { game } from "..";
import { Player } from "@common/types";

onNet("FivemReportSystem:client:updatePlayers", async (players: Player[]) => {
    game.playerManager.updatePlayers(players);
});