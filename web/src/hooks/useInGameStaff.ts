import { Staff, Time } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { useEffect, useState } from "react";

export const useInGameStaff = (playerId: number) => {
    
    const [staff, setStaff] = useState<Staff>();

    useEffect(() => {
        fetchNui<Staff>("getInGameStaff", { playerId })
        .then((retData) => {
            setStaff(retData);
        })
        .catch((e) => {
            console.error(e);
        });
    }, [playerId]);

    return [staff];
}