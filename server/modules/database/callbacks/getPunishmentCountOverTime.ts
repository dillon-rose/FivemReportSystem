import { Results, Time } from "@common/types";
import { callbacks } from "@server/modules/callbacks";
import DBManager from "../models/DBManager";
import { sortArrayToTimeSlots } from "@server/utils/sortArrayToTimeSlots";

callbacks.registerServerCallback("getPunishmentCountOverTime", async (_, time: Time): Promise<number[]> => {
    const reports = await DBManager.getReports(time);
    const reportTimes = reports.filter(report => {
        if (!report.result) return false;

        switch (report.result) {
            case Results.NOTHING: return false;
            case Results.OTHER: return false;
            case Results.VERBAL: return false;
        }
        return true;
    }).map(report => report.createdAt);

    return sortArrayToTimeSlots(reportTimes, time);
});