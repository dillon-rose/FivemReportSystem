import { Command } from "@common/types";
import { game } from "..";
import Config from "@server/sv_config";
import { error } from "@server/utils/notify";

class CommandManager {
    private commands: Command[];

    constructor() {
        this.commands = [];

        onNet("playerJoining", async (source: number, _: any) => {
            this.commands.forEach(command => {
                emitNet("chat:addSuggestion", source, `/${command.name}`, command.description, command.args);
            })
        })
    }

    public addCommand(newCommand: Command, cb: (source: number, args: string[]) => void) {
        this.commands.push(newCommand);

        emit("esx:addValidCommand", newCommand.name);
        
        RegisterCommand(newCommand.name, (source: number, args: string[]) => {
            if (!newCommand.permissions) {
                cb(source, args);
                return;
            }

            const staff = game.playerManager.getInGameStaff(source);

            if (!staff || !newCommand.permissions.includes(Config.STAFF_ROLES[staff.rank])) {
                error(source, "You do not have permission to use this command.");
                return;
            }

            cb(source, args);
        }, false);
    }
}

export default CommandManager;