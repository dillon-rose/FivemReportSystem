import DBManager from "./models/DBManager";

const dbManager = new DBManager();

export { dbManager };

import "./callbacks/addNote";
import "./callbacks/getAllStaffOverview";
import "./callbacks/getNonPunishmentCountOverTime";
import "./callbacks/getPlayerReports";
import "./callbacks/getPunishmentCountOverTime";
import "./callbacks/getReportCountOverTime";
import "./callbacks/getStaffStats";