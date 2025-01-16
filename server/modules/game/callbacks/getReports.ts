import { callbacks } from "@server/modules/callbacks";
import { game } from "..";

callbacks.registerServerCallback("getReports", (source) => {
    return game.reportManager.getReports();
});