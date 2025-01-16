import { Player } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { useEffect, useState } from "react"
import { useNuiEvent } from "./useNuiEvent";

export const usePlayer = (playerId: number, loader: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (playerId < 1) return [null];
    
    const [player, setPlayer] = useState<Player>();

    useEffect(() => {
        loader(true);
        fetchNui<Player>("getPlayer", { playerId })
        .then((retData) => {
            setPlayer(retData);
            loader(false);
        })
        .catch((e) => {
            console.error(e);
            loader(false);
        });
    }, [playerId]);

    useNuiEvent<Player[]>('updatePlayers', (data) => {
        for (const player of data) {
            if (player.id === playerId) {
                setPlayer(player);
                break;
            }
        }
    });

    return [player];
}