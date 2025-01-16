import { nuiManager } from "@client/modules/nui";
import { game } from "..";

nuiManager.registerNuiCallback("getReports", async (_, cb) => {
    const reports = game.reportManager.getReports();

    cb(reports);
}, false);