import { useNuiEvent } from "@/hooks/useNuiEvent";
import { Permission } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { isEnvBrowser } from "@/utils/misc";
import { createContext, useContext, useEffect, useState } from "react";

interface StateContextType {
    permission: Permission,
    myDiscordId: string | null,
    activeReport: number | null
}

const defaultState: StateContextType = {
    permission: Permission.UNAUTHORIZED,
    myDiscordId: null,
    activeReport: null
}

const StateContext = createContext<StateContextType>(defaultState);

export const ContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [permission, setPermission] = useState(isEnvBrowser() ? Permission.ADMIN : Permission.UNAUTHORIZED);
    const [myDiscordId, setMyDiscordId] = useState<string | null>(null);
    const [activeReport, setActiveReport] = useState<number | null>(null);
    const [volume, setVolume] = useState<number>(localStorage.getItem('volume') === null ? Number(localStorage.getItem('volume')) : 1);

    useNuiEvent<number>('setVolume', (data) => {
        setVolume(data);
        localStorage.setItem('volume', data.toString());
    });

    useNuiEvent<Permission>('setPermission', (data) => {
        setPermission(data);
    });

    useNuiEvent<string>('setMyDiscordId', (data) => {
        setMyDiscordId(data);
    });

    useNuiEvent<number | null>('activeReport', (data) => {
        setActiveReport(data);
    });

    useEffect(() => {
        fetchNui<{ permission: Permission, discordId: string | null }>('getInitData')
        .then((data) => {
            if (!data) return;

            setPermission(data.permission);

            if (data.discordId)
                setMyDiscordId(data.discordId);
        })
        .catch((e) => {
            console.error("Failed to get init data", e);
        });
    }, []);

    const contextProviderValue: StateContextType = {
        permission,
        myDiscordId,
        activeReport
    }

    return (
        <StateContext.Provider value={contextProviderValue}>
            {children}
        </StateContext.Provider>
    )
}

export { StateContext };