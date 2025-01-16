import { fetchNui } from "@/utils/fetchNui";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNuiEvent } from "./useNuiEvent";

type ReturnData = {
    players: number;
    maxPlayers: number;
}

export const usePlayerCount = (defaultPlayers: number, defaultMaxPlayers: number) => {
    const [playerCount, setPlayerCount] = useState(defaultPlayers);
    const [maxPlayers, setMaxPlayers] = useState(defaultMaxPlayers);

    useEffect(() => {
        fetchNui<ReturnData>("getPlayerCount")
        .then((retData) => {
            setMaxPlayers(retData.maxPlayers);
            setPlayerCount(retData.players);
        })
        .catch((e) => {
            toast.error("Failed to get player count.", {
                duration: 4000,
                closeButton: true
            });
        });
    }, []);

    useNuiEvent<number>('updatePlayerCount', (data) => {
        setPlayerCount(data);
    });

    return [playerCount, maxPlayers];
}