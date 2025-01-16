import { game } from "..";
import Config from "@server/sv_config";
import { GameReport, InGameStaff, Permission, Response, Results, Statuses, TReport } from "@common/types";
import { callbacks } from "@server/modules/callbacks";
import { info, success, error, reportNotify } from "@server/utils/notify";
import DBManager from "@server/modules/database/models/DBManager";

class ReportManager {
    private reports: GameReport[] = [];

    constructor() {
        this.reports = [];
    }

    public getReports() {
        return this.reports;
    }

    public getReport(reportNumber: number) {
        return this.reports[reportNumber];
    }

    public async updateReport(reportNumber: number, report: GameReport) {
        this.reports[reportNumber] = report;

        await DBManager.updateReport(this.reports[reportNumber].id, report);
        this.updateReportForStaff(reportNumber);
    }

    public async createReport(description: string, creatorId: number, offenderId?: number) {
        const creator = game.playerManager.getPlayer(creatorId);
        const offender = offenderId ? game.playerManager.getPlayer(offenderId) : undefined;

        if (offenderId && !offender) {
            error(creatorId, "Couldn't find the player you are reporting. Make sure they are online and try again.");
            return null;
        }

        if (!creator) {
            error(creatorId, "Couldn't find your player data. This shouldn't happen so please report it to a developer.");
            return null;
        }

        const creatorSs = await callbacks.triggerClientCallback<string>(creatorId, "getPlayerScreenshot");
        const offenderSs = offenderId ? await callbacks.triggerClientCallback<string>(offenderId, "getPlayerScreenshot") : undefined;

        const createdAt = Date.now();

        const id = await DBManager.addReport(creator, description, createdAt, offender);

        const report: GameReport = {
            id,
            description,
            creator,
            offender,
            createdAt,
            reportNumber: this.reports.length,
            status: Statuses.UNSOLVED,
            screenshots: {
                creator: creatorSs,
                offender: offenderSs,
            },
            attatchedStaff: [],
        }

        this.reports.push(report);

        this.sendReportToStaff(report.reportNumber);

        return report;
    }

    public async respondToReport(reportNumber: number, staffId: number) {
        const staff = game.playerManager.getInGameStaff(staffId);

        if (!staff) return false;

        const player = game.playerManager.getPlayer(staffId);

        if (!player) {
            error(staffId, "Couldn't find your player data. This shouldn't happen so please report it to a developer.");
            return false;
        }

        if (player.reportNumber) {
            error(staffId, "You already have an active report.");
            return true;
        }

        const report = this.reports[reportNumber];

        if (report.primaryStaff) {
            if (report.primaryStaff?.staff.discordId === staff.discordId || report.attatchedStaff.find(response => response.staff.discordId === staff.discordId)) {
                error(staffId, "You are already attatched to this report.");
                return true;
            }


            await DBManager.attatchToReport(report.id, Date.now(), staff.discordId, false);
            
            report.attatchedStaff.push({
                staff,
                time: Date.now()
            });

            this.updateReportForStaff(reportNumber);

            info(staffId, "You are now attatched to this report.");
            return true;
        }

        const attatched = report.attatchedStaff.find(response => response.staff.discordId === staff.discordId);

        if (attatched) {
            const [_, newPrimarySuccess] = await DBManager.transferReport(report.id, undefined, staff.discordId);

            if (!newPrimarySuccess) {
                error(staffId, "Failed to transfer you from attatched to primary.");
                return false;
            }

            report.primaryStaff = {
                staff,
                time: attatched.time
            };
            report.attatchedStaff = report.attatchedStaff.filter(response => response.staff.discordId !== staff.discordId);
        }
        else {
            await DBManager.attatchToReport(report.id, Date.now(), staff.discordId, true);
            report.primaryStaff = {
                staff,
                time: Date.now()
            }
        }
        

        report.status = Statuses.SOLVING;

        game.playerManager.setActiveReport((report.primaryStaff?.staff as InGameStaff).id, reportNumber);

        this.updateReportForStaff(reportNumber);

        success(staffId, "You are now the primary staff for this report.");
        return true;
    }

    public async solveReport(reportNumber: number, staffId: number, result: Results) {
        const report = this.reports[reportNumber];

        if (report.status === Statuses.SOLVED) {
            error(staffId, "This report is already solved.");
            return false;
        }

        report.status = Statuses.SOLVED;
        report.result = result;
        report.solvedBy = game.playerManager.getInGameStaff(staffId);

        game.playerManager.removeActiveReport((report.primaryStaff?.staff as InGameStaff).id || staffId, reportNumber);

        await this.updateReport(reportNumber, this.reports[reportNumber]);

        return true;
    }

    public async transferReport(reportNumber: number, sourceId: number, newOwnerDiscord: string): Promise<boolean> {
        const report = this.reports[reportNumber];

        const source = game.playerManager.getInGameStaff(sourceId);
        const oldPrimary = report.primaryStaff;

        if (!source || !oldPrimary) return false;

        const newStaffObj = game.playerManager.getInGameStaffByDiscord(newOwnerDiscord);
        const newStaffPlayer = game.playerManager.getPlayer(newStaffObj?.id || -1);

        if (!newStaffPlayer || newStaffPlayer.left) {
            error(sourceId, "This person is not in game.");
            return false;
        }

        if (newStaffPlayer.reportNumber !== undefined) {
            error(sourceId, "This person is dealing with another report.");
            return false;
        }

        if (oldPrimary.staff.discordId !== source.discordId && Config.STAFF_ROLES[source.rank] !== Permission.ADMIN) return false;

        let newStaff: Response | null = null;
        
        for (let i = 0; i < report.attatchedStaff.length; i++) {
            if (report.attatchedStaff[i].staff.discordId=== newStaffObj?.discordId) {
                newStaff = report.attatchedStaff[i];
                report.attatchedStaff.splice(i, 1);
                break;
            }
        }

        if (!newStaff) return false;

        if (report.primaryStaff?.staff.discordId === newStaff.staff.discordId) {
            error(sourceId, "This person is already the primary staff for this report.");
            return false;
        }

        game.playerManager.removeActiveReport((oldPrimary.staff as InGameStaff).id, reportNumber);
        game.playerManager.setActiveReport((newStaff.staff as InGameStaff).id, reportNumber);
        
        report.primaryStaff = newStaff;
        report.attatchedStaff.push(oldPrimary);

        const [removeOld, addNew] = await DBManager.transferReport(report.id, oldPrimary.staff.discordId, newStaff.staff.discordId);
        this.updateReportForStaff(reportNumber);

        if (removeOld && addNew) {
            info(newStaffPlayer.id, `Report #${reportNumber + 1} has been transferred to you.`);
        }

        return removeOld && addNew;
    }

    public async removePrimaryFromReport(reportNumber: number) {
        const report = this.reports[reportNumber];

        if (!report.primaryStaff) return;

        const [removeOld, _] = await DBManager.transferReport(report.id, report.primaryStaff?.staff.discordId, undefined);

        if (!removeOld) return;

        report.attatchedStaff.push(report.primaryStaff);
        report.primaryStaff = undefined;
        report.status = Statuses.UNSOLVED;

        this.updateReportForStaff(reportNumber);
        
        game.playerManager.getStaff().forEach(staff => {
            reportNotify(staff.id, `The primary staff for report #${reportNumber + 1} has left the server.`);
        });
    }

    private updateReportForStaff(reportNumber: number) {
        game.playerManager.sendEventToStaff("updateReport", reportNumber, this.reports[reportNumber]);
    }

    private sendReportToStaff(reportNumber: number) {
        game.playerManager.sendEventToStaff("newReport", this.reports[reportNumber]);
    }
}

export default ReportManager;