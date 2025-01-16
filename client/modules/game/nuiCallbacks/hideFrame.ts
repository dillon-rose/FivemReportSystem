import { nuiManager } from "@client/modules/nui"

nuiManager.registerNuiCallback('hideFrame', (_, cb) => {
    nuiManager.toggleNuiFrame(false);
    cb({});
})