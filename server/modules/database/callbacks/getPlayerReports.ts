import { callbacks } from "@server/modules/callbacks";
import DBManager from "../models/DBManager";

callbacks.registerServerCallback("getPlayerReports", async (_, playerHex: string) => {
    const reports = await DBManager.getPlayerReports(playerHex);
    
    return reports;
});