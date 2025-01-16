class CallbackManager {
    private listeners: Map<string, (...args: any) => void>;

    constructor() {
        this.listeners = new Map<string, (...args: any[]) => void>();
    }

    public registerServerCallback(eventName: string, eventCallback: (source: number, ...args: any[]) => any) {
        if (this.listeners.has(eventName)) this.unregisterServerCallback(eventName);
        
        const eventListener = async (...args: any[]) => {
            const src = source;
            const data = await eventCallback(src, ...args);

            emitNet(`pmc__client_callback_response:${eventName}:${src}`, src, data);
        }

        onNet(`pmc__server_callback:${eventName}`, eventListener);

        this.listeners.set(eventName, eventListener);
    }

    public unregisterServerCallback(eventName: string) {
        if (!this.listeners.has(eventName)) return;

        removeEventListener(`pmc__server_callback:${eventName}`, this.listeners.get(eventName) as Function);

        this.listeners.delete(eventName);
    }

    public async triggerClientCallback<T>(source: number, eventName: string, ...args: any[]): Promise<T> {
        if (source <= 0) {
            throw new Error('source should be a valid player id');
        }
        
        const ticket = `${source}x${Date.now()}`;

        return await new Promise((resolve, reject) => {
            const eventListener = (data: T) => {
                resolve(data);

                removeEventListener(`pmc__callback_retval:${source}:${eventName}:${ticket}`, eventListener);
            }

            onNet(`pmc__callback_retval:${source}:${eventName}:${ticket}`, eventListener);

            emitNet(`pmc__client_callback:${eventName}`, source, ticket, ...args);

            setTimeout(() => {
                removeEventListener(`pmc__callback_retval:${source}:${eventName}:${ticket}`, eventListener);

                reject("timeout");
            }, 10 * 1000);
        })
    }


}

export default CallbackManager;