import { StaffStats, Time } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { useEffect, useState } from "react"

export const useStaff = (discordId: string | undefined, time: Time, loader: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!discordId) return [null]
    
    const [staff, setStaff] = useState<StaffStats>();

    useEffect(() => {
        loader(true);
        fetchNui<StaffStats>("getStaff", { discordId, time })
        .then((retData) => {
            setStaff(retData);
            loader(false);
        })
        .catch((e) => {
            console.error(e);
            loader(false);
        });
    }, [discordId, time]);

    return [staff];
}