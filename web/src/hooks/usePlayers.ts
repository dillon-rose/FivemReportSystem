import { Player } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { useNuiEvent } from "./useNuiEvent";

export const usePlayers = (loader: React.Dispatch<React.SetStateAction<boolean>>) => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        loader(true);
        fetchNui<Player[]>("getPlayers", undefined)
        .then((retData) => {
            setPlayers(retData);
            loader(false);
        })
        .catch((e) => {
            toast.error("Failed to get players.", {
            duration: 4000,
            closeButton: true
            });
            loader(false);
        });
    }, []);

    useNuiEvent<Player[]>('updatePlayers', (data) => {
        setPlayers(data);
    });

    return [players];
}