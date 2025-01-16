import { TReport } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { useState, useEffect } from "react";
import { useNuiEvent } from "./useNuiEvent";

export const usePlayerReports = (playerHex: string, loader: React.Dispatch<React.SetStateAction<boolean>>) => {
    const [reports, setPlayerReports] = useState<TReport[]>([]);
    
    useEffect(() => {
        loader(true);
        fetchNui<TReport[]>('getPlayerReports', { playerHex })
        .then((data) => {
            setPlayerReports(data);
            loader(false);
        })
        .catch((err) => {
            console.error(err);
            loader(false);
        });
    }, [playerHex]);

    useNuiEvent<{ report: TReport}>('updateReport', ({ report }) => {
        if (report.creator.steam !== playerHex && report.offender?.steam !== playerHex) return;

        setPlayerReports((prev) => {
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].id === report.id) {
                    prev[i] = report;
                    return prev;
                }
            }

            return [report, ...prev];
        });
    });
    
    return [reports];
}