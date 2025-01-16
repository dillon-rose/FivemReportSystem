import PlayerManager from "./models/PlayerManager";
import CommandManager from "./models/CommandManager";
import ReportManager from "./models/ReportManager";

const game = {
    playerManager: new PlayerManager(),
    commandManager: new CommandManager(),
    reportManager: new ReportManager(),
}

on("FivemReportSystem:server:discordReady", () => {
    game.playerManager.populatePlayers();
})

export { game };

import "./events/onPlayerJoin";
import "./events/onPlayerDropped";

import "./callbacks/getDiscordId";
import "./callbacks/getInGameStaff";
import "./callbacks/getPermissions";
import "./callbacks/getPlayer";
import "./callbacks/getPlayers";
import "./callbacks/getReports";
import "./callbacks/getScreenshotUrl";
import "./callbacks/getStaff";
import "./callbacks/respondToReport";
import "./callbacks/solveReport";
import "./callbacks/transferReport";
import "./callbacks/updateReportResult";
import "./callbacks/updateReportStatus";

import "./commands/createReport";
import "./commands/reportList";
import "./commands/staffVolume";