import { Results, Statuses, TRating } from "@common/types";
import { TStaffRole } from "./sv_config";

export interface Staff {
    discordId: string,
    name: string,
    rank: TStaffRole,
}

export interface InGameStaff extends Staff {
    id: number,
}

export type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

export type DBReport = {
    id: number,
    creatorName: string,
    creatorHex: string,
    offenderName: string | null,
    offenderHex: string | null,
    createdAt: number,
    status: Statuses,
    result: Results | null,
    solvedByDiscordId: string | null,
    description: string,
}

export type DBResponse = {
    reportId: number,
    time: number,
    staffDiscord: string,
    isPrimary: boolean,
}

export type DBNote = {
    reportId: number | null,
    targetDiscord: string,
    note: string,
    creatorDiscord: string,
    rating: TRating,
    noteId: number,
    timestamp: number,
}