class CallbackManager {
    private playerId: number;
    private listeners: Map<string, (...args: any[]) => void>;

    constructor() {
        this.playerId = GetPlayerServerId(PlayerId());
        this.listeners = new Map<string, (...args: any[]) => void>();
    }

    public registerClientCallback(eventName: string, eventCallback: (...args: any[]) => any) {
        if (this.listeners.has(eventName)) this.unregisterClientCallback(eventName);

        const eventListener = async (ticket: string, ...eventArgs: any[]) => {
            const data = await eventCallback(...eventArgs);

            emitNet(`pmc__callback_retval:${this.playerId}:${eventName}:${ticket}`, data);
        }

        onNet(`pmc__client_callback:${eventName}`, eventListener);

        this.listeners.set(eventName, eventListener);
    }

    public unregisterClientCallback(eventName: string) {
        if (!this.listeners.has(eventName)) return;

        removeEventListener(`pmc__client_callback:${eventName}`, this.listeners.get(eventName) as Function);

        this.listeners.delete(eventName);
    }

    public async triggerServerCallback<T>(eventName: string, ...args: any[]): Promise<T> {
        return await new Promise((resolve, reject) => {
            const eventListener = (data: T) => {
                resolve(data);
    
                removeEventListener(`pmc__client_callback_response:${eventName}:${this.playerId}`, eventListener);
            }
    
            onNet(`pmc__client_callback_response:${eventName}:${this.playerId}`, eventListener);
            
            // request the callback
            emitNet(`pmc__server_callback:${eventName}`, ...args);
    
            setTimeout(() => {
                removeEventListener(`pmc__client_callback_response:${eventName}:${this.playerId}`, eventListener);

                reject("timeout");
            }, 10 * 1000);
        });
    }


}

export default CallbackManager;