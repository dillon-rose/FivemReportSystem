import { callbacks } from "@server/modules/callbacks";
import { Results, StaffStats, TReport } from "@common/types";
import { discordManager } from "@server/modules/discord";
import DBManager from "../models/DBManager";

callbacks.registerServerCallback("getStaffStats", async (source, discordId, time) => {
    const staff = await discordManager.getStaff(discordId);

    if (!staff) return null;
    
    const staffStats: StaffStats = {
        avgWaitTime: 0,
        numResponses: 0,
        numFirstResponses: 0,
        numSolved: 0,
        punishmentCounts: {
            bans: 0,
            kicks: 0,
            warns: 0,
            verbals: 0,
            nothing: 0,
            other: 0
        },
        responses: [],
        solvedReports: [],
        staff: {
            discordId: staff.discordId || "N/A",
            name: staff.name || "N/A",
            rank: staff.rank || "N/A"
        },
        notes: []
    }

    if (!staff) return staffStats;
    
    const reports = await DBManager.getStaffReports(discordId, time);

    getStaffStatsFromReports(staffStats, reports, discordId);

    const notes = await DBManager.getStaffnotes(discordId, time);

    staffStats.notes = notes;

    return staffStats;
});

function getStaffStatsFromReports(staffStatsObject: StaffStats, reports: TReport[], discordId: string) {
    for (const report of reports) {
        let allResponses = report.attatchedStaff.concat(report.primaryStaff ? [report.primaryStaff] : []);

        // this means the report has no responses and thus no stats to count
        if (allResponses.length === 0) continue;

        let firstResponse = allResponses[0];
        let lowestTime = firstResponse.time - report.createdAt;
        let myResponse = null;

        for (const response of allResponses) {
            if (response.time - report.createdAt < lowestTime) {
                firstResponse = response;
                lowestTime = response.time - report.createdAt;
            }

            if (!myResponse && response.staff.discordId === discordId) {
                myResponse = response;
            }
        }

        // the desired staff member did not respond to this report
        if (!myResponse) continue;

        const first = firstResponse === myResponse;

        if (first) {
            staffStatsObject.numFirstResponses++;
        }

        staffStatsObject.avgWaitTime += (myResponse.time - report.createdAt) / 1000;
        staffStatsObject.responses.push(report);

        if (report.solvedBy && report.solvedBy.discordId === discordId) {
            staffStatsObject.solvedReports.push(report);

            switch (report.result) {
                case Results.BAN:
                    staffStatsObject.punishmentCounts.bans++;
                    break;
                case Results.KICK:
                    staffStatsObject.punishmentCounts.kicks++;
                    break;
                case Results.WARN:
                    staffStatsObject.punishmentCounts.warns++;
                    break;
                case Results.VERBAL:
                    staffStatsObject.punishmentCounts.verbals++;
                    break;
                case Results.NOTHING:
                    staffStatsObject.punishmentCounts.nothing++;
                    break;
                case Results.OTHER:
                    staffStatsObject.punishmentCounts.other++;
                    break;
            }
        }
    }

    staffStatsObject.numResponses = staffStatsObject.responses.length
    staffStatsObject.numSolved = staffStatsObject.solvedReports.length;

    staffStatsObject.avgWaitTime /= staffStatsObject.numResponses;
}