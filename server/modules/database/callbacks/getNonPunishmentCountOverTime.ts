import { Results, Time } from "@common/types";
import { callbacks } from "@server/modules/callbacks";
import DBManager from "../models/DBManager";
import { sortArrayToTimeSlots } from "@server/utils/sortArrayToTimeSlots";

callbacks.registerServerCallback("getNonPunishmentCountOverTime", async (_, time: Time): Promise<number[]> => {
    const reports = await DBManager.getReports(time);
    const reportTimes = reports.filter(report => {
        if (!report.result) return false;

        switch (report.result) {
            case Results.NOTHING: return true;
            case Results.OTHER: return true;
            case Results.VERBAL: return true;
        }

        return false;
    }).map(report => report.createdAt);

    return sortArrayToTimeSlots(reportTimes, time);
});