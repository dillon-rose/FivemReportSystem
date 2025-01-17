import { StaffPlaytime, StaffStats, Time } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { useEffect, useState } from "react"

export const useStaffPlaytime = (discordId: string | undefined, time: Time, loader: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!discordId) return [null]
    
    const [staffPlaytime, setStaffPlaytime] = useState<StaffPlaytime>();

    useEffect(() => {
        loader(true);
        fetchNui<StaffPlaytime>("getStaffPlaytime", { discordId, time })
        .then((retData) => {
            setStaffPlaytime(retData);
            loader(false);
        })
        .catch((e) => {
            console.error(e);
            loader(false);
        });
    }, [discordId, time]);

    return [staffPlaytime];
}