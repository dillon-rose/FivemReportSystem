import Config from "@common/shared_config";
import { game } from "..";
import { Permission } from "@common/types";

setImmediate(() => {
    game.commandManager.addCommand({
        name: Config.COMMANDS.openReportUI,
        description: "Open the Report System UI.",
        permissions: [Permission.MODERATOR, Permission.ADMIN, Permission.USER],
        args: []
    }, async (source, args) => {
        game.playerManager.sendEventToPlayer("openReportUI", source);
    });
});