import { StaffStatsOverview, Time } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useAllStaff = (time: Time, loader: React.Dispatch<React.SetStateAction<boolean>>) => {
    const [staffOverview, setStaffOverview] = useState<StaffStatsOverview[]>([]);

    useEffect(() => {
        loader(true);
        fetchNui<StaffStatsOverview[]>("getAllStaffOverview", { time })
        .then((retData) => {
            setStaffOverview(retData);
            loader(false);
        })
        .catch((e) => {
            toast.error("Failed to get Staff.", {
                duration: 4000,
                closeButton: true
            });
            loader(false);
        });
    }, [time]);

    return [staffOverview];
}