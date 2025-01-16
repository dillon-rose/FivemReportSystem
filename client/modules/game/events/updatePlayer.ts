import { game } from "..";
import { Player } from "@common/types";

onNet("FivemReportSystem:client:updatePlayer", async (playerId: number, player: Player | null) => {
    game.playerManager.setPlayer(playerId, player);
});