import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { notify } from "@client/utils/notify";
import { GameReport } from "@common/types";

class ReportManager {
    private reports: GameReport[];

    constructor () {
        this.reports = [];
    }

    public getReport(reportNumber: number): GameReport | null {
        if (reportNumber < 0 || reportNumber >= this.reports.length) return null;

        return this.reports[reportNumber];
    }

    public getReports(): GameReport[] {
        return this.reports;
    }

    public setReports(reports: GameReport[]) {
        this.reports = reports;

        nuiManager.SendReactMessage("updateReports", reports);
    }

    public addReport(report: GameReport) {
        this.reports.push(report);

        nuiManager.SendReactMessage("updateReports", this.reports);

        notify("report", report.description);
    }

    public updateReport(reportNumber: number, report: GameReport) {
        this.reports[reportNumber] = report;

        nuiManager.SendReactMessage("updateReport", report);
        nuiManager.SendReactMessage("updateReports", this.reports);
    }
}

export default ReportManager;