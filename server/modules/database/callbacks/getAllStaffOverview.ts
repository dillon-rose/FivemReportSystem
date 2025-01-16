import { Results, Staff, StaffStatsOverview, Time, TReport } from "@common/types";
import { callbacks } from "@server/modules/callbacks";
import { discordManager } from "@server/modules/discord";
import DBManager from "../models/DBManager";

callbacks.registerServerCallback("getAllStaffOverview", async (source, time: Time) => {
    const staffMap: Map<string, Staff> = await discordManager.getAllStaff();
    const reports: TReport[] = await DBManager.getReports(time);

    const staffStatsMap: Map<string, StaffStatsOverview> = new Map();
    const staffStatsArray: StaffStatsOverview[] = [];

    reports.forEach(report => {
        const reportTime = report.createdAt;
        const primaryStaff = report.primaryStaff;
        const allResponses = report.attatchedStaff.concat(primaryStaff ? [primaryStaff] : []);

        if (allResponses.length === 0) return;

        let lowestTime = allResponses[0].time - reportTime;
        let firstResponse = allResponses[0];

        allResponses.forEach(response => {
            const staffId = response.staff.discordId;
            const staff = staffMap.get(staffId);

            if (!staff) return;

            let staffOverview: StaffStatsOverview | undefined = staffStatsMap.get(staffId);

            if (!staffOverview) {
                staffOverview = {
                    staff,
                    numResponses: 0,
                    numFirstResponses: 0,
                    numSolved: 0,
                    avgWaitTime: 0,
                    punishmentCounts: {
                        bans: 0,
                        kicks: 0,
                        warns: 0,
                        verbals: 0,
                        nothing: 0,
                        other: 0
                    },
                }
                staffStatsMap.set(staffId, staffOverview);
                staffStatsArray.push(staffOverview);
            }

            staffOverview.numResponses++;
            staffOverview.avgWaitTime += response.time - reportTime;

            if (response.time - reportTime < lowestTime) {
                lowestTime = response.time - reportTime;
                firstResponse = response;
            }
        });

        const firstResponseStats = staffStatsMap.get(firstResponse.staff.discordId);

        if (firstResponseStats) {
            firstResponseStats.numFirstResponses++;
        }

        if (report.solvedBy) {
            let staffOverview: StaffStatsOverview | undefined = staffStatsMap.get(report.solvedBy.discordId);

            if (!staffOverview) {
                staffOverview = {
                    staff: report.solvedBy,
                    numResponses: 0,
                    numFirstResponses: 0,
                    numSolved: 0,
                    avgWaitTime: 0,
                    punishmentCounts: {
                        bans: 0,
                        kicks: 0,
                        warns: 0,
                        verbals: 0,
                        nothing: 0,
                        other: 0
                    },
                }
                staffStatsMap.set(report.solvedBy.discordId, staffOverview);
                staffStatsArray.push(staffOverview);
            }

            staffOverview.numSolved++;

            switch (report.result) {
                case Results.BAN:
                    staffOverview.punishmentCounts.bans++;
                    break;
                case Results.KICK:
                    staffOverview.punishmentCounts.kicks++;
                    break;
                case Results.WARN:
                    staffOverview.punishmentCounts.warns++;
                    break;
                case Results.VERBAL:
                    staffOverview.punishmentCounts.verbals++;
                    break;
                case Results.NOTHING:
                    staffOverview.punishmentCounts.nothing++;
                    break;
                case Results.OTHER:
                    staffOverview.punishmentCounts.other++;
                    break;
            }
        }
    });

    staffStatsArray.forEach(staff => {
        staff.avgWaitTime /= staff.numResponses * 1000;
    });

    return staffStatsArray;
});