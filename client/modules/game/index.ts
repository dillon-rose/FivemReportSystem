import ReportManager from "./models/ReportManager";
import PlayerManager from "./models/PlayerManager";

const game = {
    reportManager: new ReportManager(),
    playerManager: new PlayerManager()
};

export { game }

import "./callbacks/getScreenshot";

import "./events/initData";
import "./events/newReport";
import "./events/notify";
import "./events/openReportUI";
import "./events/setActiveReport";
import "./events/staffVolume";
import "./events/updatePlayer";
import "./events/updatePlayers";
import "./events/updateReport";

import "./keybinds/reportUI";

import "./nuiCallbacks/addNote";
import "./nuiCallbacks/getAllStaffOverview";
import "./nuiCallbacks/getInGameStaff";
import "./nuiCallbacks/getInitData";
import "./nuiCallbacks/getNonPunishmentCountOverTime";
import "./nuiCallbacks/getPlayer";
import "./nuiCallbacks/getPlayerCount";
import "./nuiCallbacks/getPlayerReports";
import "./nuiCallbacks/getPlayers";
import "./nuiCallbacks/getReports";
import "./nuiCallbacks/getPunishmentCountOverTime";
import "./nuiCallbacks/getReportCountOverTime";
import "./nuiCallbacks/getStaff";
import "./nuiCallbacks/hideFrame";
import "./nuiCallbacks/respondToReport";
import "./nuiCallbacks/solveReport";
import "./nuiCallbacks/transferReport";
import "./nuiCallbacks/updateReportResult";
import "./nuiCallbacks/updateReportStatus";