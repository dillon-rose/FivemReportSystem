import Config from "@common/shared_config";

class NuiManager {
    constructor () {
        this.registerNuiCallback('hideFrame', (_, cb) => {
            this.toggleNuiFrame(false);
            cb({});
        });
    }

    public registerNuiCallback<T extends object>(event: string, callback: (data: T, cb: (data: any) => void) => void, cache?: boolean) {
        const nuiCache = new Map<string, string>();

        RegisterNuiCallbackType(event);
        on(`__cfx_nui:${event}`, (data: T, cb: (data: any) => void) => {

            if (!cache) {
                callback(data, (d: any) => cb(JSON.stringify(d)));
                return;
            }

            const cacheKey = data ? Object.values(data).join('-') : 'empty';

            if (nuiCache.has(cacheKey)) {
                cb(nuiCache.get(cacheKey));
            }
            else {
                callback(data, (retData) => {
                    const str = JSON.stringify(retData);

                    nuiCache.set(cacheKey, str);

                    setTimeout(() => {
                        nuiCache.delete(cacheKey);
                    }, Config.NUI_CACHE_TIMER);

                    cb(str);
                });
            }
        });
    }

    public toggleNuiFrame(shouldShow: boolean) {
        SetNuiFocus(shouldShow, shouldShow)
        this.SendReactMessage('setVisible', shouldShow)
    }

    public SendReactMessage(action: string, data: Object) {
        SendNUIMessage({
            action: action,
            data: data
          })
    }
}

export default NuiManager;