import { callbacks } from "@server/modules/callbacks";
import { getPlayerDiscord } from "@server/utils/getPlayerData";

callbacks.registerServerCallback("getDiscordId", async (source) => {
    return getPlayerDiscord(source);
});