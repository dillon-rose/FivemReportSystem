import { callbacks } from "@server/modules/callbacks";
import { game } from "..";

callbacks.registerServerCallback("getStaff", (source) => {
    return game.playerManager.getInGameStaff(source);
});