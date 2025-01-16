import { Time } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useReportTimes = (time: Time, loader: React.Dispatch<React.SetStateAction<boolean>>) => {
    const [reportTimes, setReportTimes] = useState<number[]>([]);
    const [punishmentTimes, setPunishmentTimes] = useState<number[]>([]);
    const [nonPunishmentTimes, setNonPunishmentTimes] = useState<number[]>([]);

    const [loadState, setLoadState] = useState(0);

    useEffect(() => {
        loader(true);
        setLoadState(3);
        fetchNui<number[]>("getReportCountOverTime", { time })
        .then((retData) => {
            setReportTimes(retData);
            setLoadState(loadState - 1);
        })
        .catch((e) => {
            toast.error("Failed to get staff data.", {
                duration: 4000,
                closeButton: true
            });
            setLoadState(loadState - 1);
        });

        fetchNui<number[]>("getPunishmentCountOverTime", { time })
        .then((retData) => {
            setPunishmentTimes(retData);
            setLoadState(loadState - 1);
        }).catch((e) => {
            toast.error("Failed to get staff data.", {
                duration: 4000,
                closeButton: true
            });
            setLoadState(loadState - 1);
        });

        fetchNui<number[]>("getNonPunishmentCountOverTime", { time })
        .then((retData) => {
            setNonPunishmentTimes(retData);
            setLoadState(loadState - 1);
        }).catch((e) => {
            toast.error("Failed to get staff data.", {
                duration: 4000,
                closeButton: true
            });
            setLoadState(loadState - 1);
        });
    }, [time]);

    useEffect(() => {
        if (loadState <= 0) {
            loader(false);
        }
    }, [loadState]);

    return [reportTimes, punishmentTimes, nonPunishmentTimes];
}