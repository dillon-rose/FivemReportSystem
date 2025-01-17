export interface TReport {
    id: number,
    description: string,
    creator: Player,
    offender?: Player,
    createdAt: number,
    status: Statuses,
    result?: Results,
    primaryStaff?: Response,
    attatchedStaff: Response[],
    solvedBy?: Staff
}

export interface GameReport extends TReport {
    reportNumber: number,
    screenshots: {
        creator: string,
        offender?: string
    }
}

export interface Staff {
    discordId: string,
    name: string,
    rank: string,
}

export interface InGameStaff extends Staff {
    id: number,
    sessionLength: number,
}

export type StaffPlaytime = {
    staff: Staff,
    sessions: {
        startTime: number,
        length: number,
    }[]
}

export type Response = {
    staff: Staff,
    time: number,
}

export interface StaffStatsOverview {
    staff: Staff,
    numResponses: number,
    numFirstResponses: number,
    numSolved: number,
    avgWaitTime: number,
    punishmentCounts: {
        bans: number, 
        kicks: number, 
        warns: number, 
        verbals: number, 
        nothing: number, 
        other: number
    },
}

export interface StaffStats extends StaffStatsOverview {
    solvedReports: TReport[],
    responses: TReport[],
    notes: Note[],
}

export type Note = {
    rating: TRating,
    description: string,
    staffId: string,
    report?: TReport,
    creator: Staff,
    time: number,
}

export enum Statuses {
    SOLVING = "solving",
    UNSOLVED = "unsolved",
    SOLVED = "solved",
}

export enum Results {
    BAN = "ban",
    KICK = "kick",
    WARN = "warn",
    VERBAL = "verbal",
    NOTHING = "nothing",
    OTHER = "other",
}

export type Player = {
    id: number,
    name: string,
    steam: string,
    sessionLength: number,
    reportNumber?: number,
    left?: boolean,
    trustscore?: number,
    playtime?: number,
}

export enum Permission {
    // highest permission
    ADMIN = 1,
    MODERATOR = 2,
    USER = 3,
    UNAUTHORIZED = 4,
    // lowest permission
}

export enum Time {
    WEEK = "weekly",
    MONTH = "monthly",
}

export enum TRating {
    POSITIVE = "POSITIVE",
    NEGATIVE = "NEGATIVE",
    NEUTRAL = "NEUTRAL",
}
