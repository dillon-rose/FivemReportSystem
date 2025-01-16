import { callbacks } from "@server/modules/callbacks";
import { game } from "..";

callbacks.registerServerCallback("getInGameStaff", (_: number, playerId: number) => {
    const staff = game.playerManager.getInGameStaff(playerId);
    return staff;
});