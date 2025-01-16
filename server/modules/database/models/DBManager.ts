import { Time, TRating, TReport, Player, Staff, Note } from "@common/types";
import { discordManager } from "@server/modules/discord";
import { DBNote, DBReport, DBResponse, Nullable } from "@server/types";

class DBManager {
    public static oneWeek: number = 60 * 60 * 24 * 7;
    public static oneMonth: number = 60 * 60 * 24 * 7 * 4;

    constructor() {
        this.cleanTables();
    }

    public static async getReports(time: Time): Promise<TReport[]> {
        const timeInSeconds = time === Time.WEEK ? DBManager.oneWeek : DBManager.oneMonth;
        const timeStamp = (Date.now() / 1000) - timeInSeconds;
        
        const rawReports = await exports.oxmysql.rawExecute_async('SELECT * FROM p_reports as r LEFT JOIN p_report_responses as rr ON r.id = rr.reportId WHERE r.createdAt > ?', [timeStamp]) as (DBReport & (DBResponse | Nullable<DBResponse>))[];

        const reports = await this.convertDBReportToReport(rawReports);

        return reports;
    }

    public static async getStaffReports(discordId: string, time: Time): Promise<TReport[]> {
        const timeInSeconds = time === Time.WEEK ? DBManager.oneWeek : DBManager.oneMonth;
        const timeStamp = (Date.now() / 1000) - timeInSeconds;
        
        const rawReports = await exports.oxmysql.rawExecute_async(`
            SELECT 
                * 
            FROM 
                p_reports AS r 
            INNER JOIN 
                p_report_responses AS rr ON r.id = rr.reportId 
            WHERE 
                rr.reportId IN (
                    SELECT DISTINCT 
                        rr1.reportId 
                    FROM 
                        p_report_responses AS rr1 
                    WHERE 
                        rr1.staffDiscord = ? 
                        AND r.createdAt > ?
                )
            `, [discordId, timeStamp]) as (DBReport & DBResponse)[];

        const reports = await this.convertDBReportToReport(rawReports);

        return reports;
    }

    public static async getStaffnotes(discordId: string, time: Time): Promise<Note[]> {
        const timeInSeconds = time === Time.WEEK ? DBManager.oneWeek : DBManager.oneMonth
        const timeStamp = (Date.now() / 1000) - timeInSeconds;

        const rawNotes = await exports.oxmysql.rawExecute_async(`
        SELECT 
            *
        FROM 
            p_report_notes AS n
        LEFT JOIN 
            p_reports AS r ON n.reportId = r.id
        LEFT JOIN 
            p_report_responses AS rr ON r.id = rr.reportId
        WHERE 
            n.targetDiscord = ? 
            AND n.timestamp > ?
            AND (r.createdAt IS NULL OR r.createdAt > ?)
        `, [discordId, timeStamp, timeStamp]) as (DBReport & DBNote & (DBResponse | Nullable<DBResponse>))[];
        

        const reports: TReport[] = await this.convertDBReportToReport(rawNotes);
        const reportMap: Map<number, TReport> = new Map();
        reports.forEach(report => reportMap.set(report.id, report));

        const notes: Map<number, Note> = new Map();

        for(const rawNote of rawNotes) {
            if (notes.has(rawNote.noteId)) continue;

            const report = reportMap.get(rawNote?.reportId || -1);

            const noteCreator = await discordManager.getStaff(rawNote.creatorDiscord);

            notes.set(rawNote.noteId, {
                creator: noteCreator || {
                    discordId: "N/A",
                    name: "Retired Staff",
                    rank: "N/A"
                },
                description: rawNote.note,
                rating: rawNote.rating,
                staffId: rawNote.targetDiscord,
                report: report,
                time: rawNote.timestamp * 1000,
            } as Note);
        };

        return Array.from(notes.values());
    }

    public static async getPlayerReports(playerHex: string): Promise<TReport[]> {
        const res: any[] = await exports.oxmysql.rawExecute_async('SELECT * FROM p_reports WHERE creatorHex = ? OR offenderHex = ?', [playerHex, playerHex]) as DBReport[];

        let reports: TReport[] = [];

        res.forEach(async (report) => {
            reports.push({
                id: report.id,
                creator: {
                    name: report.creatorName,
                    steam: report.creatorHex,
                    id: -1,
                },
                offender: report.offenderName ? {
                    name: report.offenderName,
                    steam: report.offenderHex,
                    id: -1,
                } : undefined,
                createdAt: report.createdAt * 1000,
                description: report.description,
                status: report.status,
                result: report.result ? report.result : undefined,
                attatchedStaff: [],
            });
        });

        return reports;
    }

    public static async updateReport(reportId: number, report: TReport): Promise<boolean> {
        const affected = await exports.oxmysql.update_async('UPDATE p_reports SET status = ?, result = ?, solvedByDiscordId = ? WHERE id = ?', [report.status, report.result, report.solvedBy?.discordId || null, reportId]);

        return affected > 0;
    }

    public static async addReport(creator: Player, descripton: string, createdAt: number, offender?: Player): Promise<number> {
        const id = await exports.oxmysql.insert_async('INSERT INTO p_reports (creatorName, creatorHex, offenderName, offenderHex, createdAt, description) VALUES (?, ?, ?, ?, ?, ?)', [creator.name, creator.steam, offender?.name || null, offender?.steam || null, Math.floor(createdAt / 1000), descripton]);

        return id;
    }

    public static async addNote(reportId: number | null, creatorDiscordId: string, staffDiscordId: string, rating: TRating, note: string): Promise<boolean> {
        const id = await exports.oxmysql.insert_async('INSERT INTO p_report_notes (reportId, targetDiscord, note, creatorDiscord, rating, timestamp) VALUES (?, ?, ?, ?, ?, ?)', [reportId, staffDiscordId, note, creatorDiscordId, rating, Date.now() / 1000]);

        return id >= 0;
    }

    public static async attatchToReport(reportId: number, time: number, staffDiscordId: string, isPrimary: boolean) {
        const id = await exports.oxmysql.insert_async('INSERT INTO p_report_responses (reportId, time, staffDiscord, isPrimary) VALUES (?, ?, ?, ?)', [reportId, time / 1000, staffDiscordId, isPrimary ? 1 : 0]);

        return id;
    }

    public static async transferReport(reportId: number, oldPrimaryDiscord?: string, newPrimaryDiscord?: string): Promise<[boolean, boolean]> {
        const removePrimarySuccess = await exports.oxmysql.update_async('UPDATE p_report_responses SET isPrimary = 0 WHERE reportId = ? AND staffDiscord = ?', [reportId, oldPrimaryDiscord || null])

        const newPrimarySuccess = await exports.oxmysql.update_async('UPDATE p_report_responses SET isPrimary = 1 WHERE reportId = ? AND staffDiscord = ?', [reportId, newPrimaryDiscord])

        return [removePrimarySuccess, newPrimarySuccess || null];

    }

    private async cleanTables() {
        await exports.oxmysql.query_async('DELETE FROM p_reports WHERE createdAt < ?', [(Date.now() / 1000) - DBManager.oneMonth]);
        await exports.oxmysql.query_async('DELETE FROM p_report_notes WHERE timestamp < ?', [(Date.now() / 1000) - DBManager.oneMonth]);
    }

    private static async convertDBReportToReport(DBReports: (DBReport & (DBResponse | Nullable<DBResponse>))[]): Promise<TReport[]> {
        const reports: Map<number, TReport> = new Map();

        for (const rawReport of DBReports) {            
            if (!rawReport.reportId) {
                reports.set(rawReport.id, {
                    id: rawReport.id,
                    creator: {
                        name: rawReport.creatorName,
                        steam: rawReport.creatorHex,
                        id: -1,
                    },
                    offender: rawReport.offenderName ? {
                        id: -1,
                        name: rawReport.offenderName,
                        steam: rawReport.offenderHex || "0",
                    } : undefined,
                    createdAt: rawReport.createdAt * 1000,
                    description: rawReport.description,
                    status: rawReport.status,
                    result: rawReport.result ? rawReport.result : undefined,
                    attatchedStaff: [],
                });
                continue;
            }

            const report = rawReport as DBReport & DBResponse;

            const staff = await discordManager.getStaff(report.staffDiscord);

            const lastReport = reports.get(report.id);

            if (lastReport) {
                if (report.isPrimary) {
                    lastReport.primaryStaff = {
                        time: report.time * 1000,
                        staff: staff ?? {
                            name: "Retired Staff",
                            discordId: report.staffDiscord,
                            rank: "Retired",
                        },
                    }
                }
                else {
                    lastReport.attatchedStaff.push({
                        time: report.time * 1000,
                        staff: staff ?? {
                            name: "Retired Staff",
                            discordId: report.staffDiscord,
                            rank: "Retired",
                        },
                    });
                }
            }
            else {
                let solvedBy: Staff | undefined;

                if (report.solvedByDiscordId) {
                    const solvedByStaff = await discordManager.getStaff(report.solvedByDiscordId);
                    solvedBy = solvedByStaff || {
                        discordId: report.solvedByDiscordId,
                        name: "N/A [" + report.solvedByDiscordId + "]",
                        rank: "Retired"
                    }
                }

                let mapedReport: TReport = {
                    id: rawReport.id,
                    creator: {
                        name: rawReport.creatorName,
                        steam: rawReport.creatorHex,
                        id: -1,
                    },
                    offender: rawReport.offenderName ? {
                        id: -1,
                        name: rawReport.offenderName,
                        steam: rawReport.offenderHex || "0",
                    } : undefined,
                    createdAt: rawReport.createdAt * 1000,
                    description: rawReport.description,
                    status: rawReport.status,
                    result: rawReport.result ? rawReport.result : undefined,
                    solvedBy: solvedBy,
                    attatchedStaff: [],
                }

                if (report.isPrimary) {
                    mapedReport.primaryStaff = {
                        time: report.time * 1000,
                        staff: staff ?? {
                            name: "Retired Staff",
                            discordId: report.staffDiscord,
                            rank: "Retired",
                        },
                    }
                }
                else {
                    mapedReport.attatchedStaff.push({
                        time: report.time * 1000,
                        staff: staff ?? {
                            name: "Retired Staff",
                            discordId: report.staffDiscord,
                            rank: "Retired",
                        },
                    });
                }

                reports.set(rawReport.id, mapedReport);
            }
        }

        return Array.from(reports.values());
    }
}

export default DBManager;