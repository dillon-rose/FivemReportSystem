import { game } from ".."

on("FivemReportSystem:server:discordReady", () => {
    onNet("playerJoining", async () => {
        const source = global.source;
        const success = await game.playerManager.addPlayer(source);
    
        if (success) {
           game.playerManager.sendEventToPlayer("initData", source);
        }
    })
})
