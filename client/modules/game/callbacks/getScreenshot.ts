import { callbacks } from "@client/modules/callbacks";

//@ts-ignore
const exps = global.exports;
let discordWebhook = "";

async function getDiscordWebhook() {
    if (discordWebhook.length > 0) return discordWebhook;

    discordWebhook = (await callbacks.triggerServerCallback("getScreenshotUrl")) as string;

    return discordWebhook;
}

callbacks.registerClientCallback("getPlayerScreenshot", async () => {
    return await new Promise(async (resolve) => {
        const webhook = await getDiscordWebhook();
        exps['screenshot-basic'].requestScreenshotUpload(webhook, "files[]", (data: string) => {
            
            const image = JSON.parse(data)
            const url = image.attachments[0].url

            resolve(url);
        })
    })
})