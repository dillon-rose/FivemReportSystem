
export async function getPlayerTrustscore(playerId: number): Promise<number> {
    return 0;
}

export async function getPlayerPlaytime(playerId: number): Promise<number> {
    return 0;
}

export function getPlayerSteam(source: number | string): string | null {
    return getPlayerIdentifiers(source).find(id => id.startsWith("steam:"))?.substring(6) || null;
}

export function getPlayerDiscord(source: number | string): string | null {
    return getPlayerIdentifiers(source).find(id => id.startsWith("discord:"))?.substring(8) || null;
}