import React, {
    Context,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

interface NuiMessageData {
    action: string;
    data: unknown;
}

interface NuiEvent {
    eventId: number,
    action: string;
    cb: (data: any) => void;
}

const NuiCtx = createContext<NuiProviderValue | null>(null);

interface NuiProviderValue {
    RegisterEvent: <T>(event: string, cb: (data: T) => void) => number;
    UnRegisterEvent: (eventId: number) => void;
}

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const NuiProvider: React.FC<{ children: React.ReactNode }> = ({
children,
}) => {
    const [nuiEvents, setNuiEvents] = useState<NuiEvent[]>([]);
    const [curId, setCurId] = useState(0);

    const RegisterEvent = <T,>(event: string, cb: (data: T) => void): number => {
      let eventId = curId;
      
      setCurId(prevId => {
        eventId = prevId;

        return prevId + 1;
      });

      setNuiEvents(prevNuiEvents => [...prevNuiEvents, { eventId: eventId, action: event, cb: cb }]);

      return eventId;
    }

    const UnRegisterEvent = (eventId: number) => {
      setNuiEvents(prevNuiEvents => prevNuiEvents.filter((event) => event.eventId !== eventId));
    }

    useEffect(() => {
        const eventListener = (event: MessageEvent<NuiMessageData>) => {
            const { action: eventAction, data } = event.data;
            for (const nuiEvent of nuiEvents) {
                if (eventAction === nuiEvent.action) {
                    nuiEvent.cb(data);
                }
            }
        };
    
        window.addEventListener("message", eventListener, false);
        // Remove Event Listener on component cleanup
        return () => window.removeEventListener("message", eventListener, false);
      }, [nuiEvents]);
  
    return (
      <NuiCtx.Provider
        value={{
          RegisterEvent,
          UnRegisterEvent,
        }}
      >
        {children}
      </NuiCtx.Provider>
    );
};

export const useNui = () => useContext<NuiProviderValue>(NuiCtx as Context<NuiProviderValue>);
  