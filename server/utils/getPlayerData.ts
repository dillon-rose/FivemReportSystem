/**
 * Gets the trustscore of a player
 * 
 * @param playerId The players server id
 * @returns Their trustscore as a percentage
 */
export async function getPlayerTrustscore(playerId: number): Promise<number> {
    return 0;
}

/**
 * Gets the playtime of a player
 * 
 * @param playerId The players server id
 * @returns Their playtime in hours played
 */
export async function getPlayerPlaytime(playerId: number): Promise<number> {
    return 0;
}

export function getPlayerSteam(source: number | string): string | null {
    return getPlayerIdentifiers(source).find(id => id.startsWith("steam:"))?.substring(6) || null;
}

export function getPlayerDiscord(source: number | string): string | null {
    return getPlayerIdentifiers(source).find(id => id.startsWith("discord:"))?.substring(8) || null;
}