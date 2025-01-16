import { Time } from "@common/types";
import { callbacks } from "@server/modules/callbacks";
import DBManager from "../models/DBManager";
import { sortArrayToTimeSlots } from "@server/utils/sortArrayToTimeSlots";

callbacks.registerServerCallback("getReportCountOverTime", async (_, time: Time): Promise<number[]> => {
    const reports = await DBManager.getReports(time);
    const reportTimes = reports.map(report => report.createdAt);

    return sortArrayToTimeSlots(reportTimes, time);
});