import { useNuiEvent } from "@/hooks/useNuiEvent";
import { GameReport, Permission } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { createContext, useContext, useEffect, useState } from "react";

interface GameReportsContextType {
    getReports: () => GameReport[],
    getReport: (reportNumber: number) => GameReport | null,
}

const defaultState: GameReportsContextType = {
    getReports: () => [],
    getReport: (reportNumber: number) => null,
}

const GameReportsContext = createContext<GameReportsContextType>(defaultState);

export const GameReportsProvider = ({ children }: {children: React.ReactNode}) => {
    const [reports, setReports] = useState<GameReport[]>([]);

    useEffect(() => {
        fetchNui<GameReport[]>("getReports")
        .then((retData) => {
            setReports(retData);
        })
        .catch((e) => {
        });
    }, []);

    useNuiEvent<GameReport[]>('updateReports', (data) => {
        setReports(data);
    });

    useNuiEvent<GameReport>('updateReport', (newReport) => {
        setReports((prevReports) => {
            return prevReports.map((r) => {
                if (r.reportNumber === newReport.reportNumber) {
                    return newReport;
                }
                return r;
            })
        });
    });

    const gameReportsContextValue: GameReportsContextType = {
        getReports: () => reports,
        getReport: (reportNumber: number) => {
            return reports.find((r) => r.reportNumber === reportNumber) || null;
        }
    }

    return (
        <GameReportsContext.Provider value={gameReportsContextValue}>
            {children}
        </GameReportsContext.Provider>
    )
}

export const useGameReportsContext = () => useContext(GameReportsContext);