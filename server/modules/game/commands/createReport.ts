import Config from "@common/shared_config";
import { game } from "..";
import { error, success } from "@server/utils/notify";

setImmediate(() => {
    game.commandManager.addCommand({
        name: Config.COMMANDS.createReport,
        description: "Create a report on a player or get help from staff.",
        args: [
            { name: "OPTIONAL: player ID", help: "[OPTIONAL] If you are reprting a player put their ID here. Otherwise just start writing your reason for the report." },
            { name: "reason", help: "The reason you are making the report." }
        ],
    }, async (source, args) => {
        if (args.length == 0) {
            error(source, "You must provide a reason for the report.");
            return;
        }

        const offenderId = args.length > 1 ? parseInt(args[0], 10) || undefined : undefined;
        const description = offenderId ? args.slice(1).join(" ") : args.join(" ");

        const report = await game.reportManager.createReport(description, source, offenderId);

        if (report)
            success(source, "Report created successfully.");
    });
});
