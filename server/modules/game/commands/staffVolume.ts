import Config from "@common/shared_config";
import { game } from "..";
import { Permission } from "@common/types";
import { error, success } from "@server/utils/notify";

setImmediate(() => {
    game.commandManager.addCommand({
        name: Config.COMMANDS.reportVolume,
        description: "Set the volume of your staff reports.",
        args: [
            { name: "volume", help: "The new volume of report notifications (0.1 -> 1)" }
        ],
        permissions: [Permission.USER, Permission.MODERATOR, Permission.ADMIN],
    }, async (source, args) => {
        if (args.length == 0) {
            error(source, "You must provide the desired volume.");
            return;
        }

        const volume = parseFloat(args[0]);

        if (volume < 0.1 || volume > 1) {
            error(source, "Volume must be between 0.1 and 1.");
            return;
        }

        game.playerManager.sendEventToPlayer("staffVolume", source, volume);

        success(source, "Updated Volume.");
    });

    game.commandManager.addCommand({
        name: Config.COMMANDS.muteReports,
        description: "Mutes the report notifications.",
        args: [],
        permissions: [Permission.ADMIN],
    }, async (source, args) => {
        game.playerManager.sendEventToPlayer("staffVolume", source, 0.0);

        success(source, "Muted reports.");
    });
});
