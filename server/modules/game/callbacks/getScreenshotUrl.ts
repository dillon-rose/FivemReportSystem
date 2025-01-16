import { callbacks } from "@server/modules/callbacks";
import Config from "@server/sv_config";

callbacks.registerServerCallback("getScreenshotUrl", async () => {
    return Config.SCREENSHOT_DUMP_WEBHOOK;
});