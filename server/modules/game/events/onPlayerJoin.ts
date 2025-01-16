import { game } from ".."

onNet("playerJoining", async () => {
    const source = global.source;
    const success = await game.playerManager.addPlayer(source);

    if (success) {
       game.playerManager.sendEventToPlayer("initData", source);
    }
})