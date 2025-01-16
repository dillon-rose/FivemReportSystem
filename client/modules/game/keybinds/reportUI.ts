import Config from "@common/shared_config";

setImmediate(() => {
    RegisterCommand(`+${Config.COMMANDS.openReportUI}`, () => {
        ExecuteCommand(Config.COMMANDS.openReportUI);
    }, false);
    
    RegisterKeyMapping(`+${Config.COMMANDS.openReportUI}`, "Report UI", "keyboard", "I");
});