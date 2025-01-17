import { Player } from "@common/types";
import { discordManager } from "@server/modules/discord";
import Config, { TStaffRole } from "@server/sv_config";
import { InGameStaff } from "@server/types";
import { getPlayerDiscord, getPlayerPlaytime, getPlayerSteam, getPlayerTrustscore } from "@server/utils/getPlayerData";

class PlayerManager {
    private players: Map<number, Player>;
    private staff: Map<number, InGameStaff>;

    constructor() {
        this.players = new Map<number, Player>();
        this.staff = new Map<number, InGameStaff>();
    }

    public populatePlayers = async () => {
        this.players.clear();

        const curPlayers = getPlayers();

        for (const player of curPlayers) {
            
            await this.addPlayer(parseInt(player));
        }

        this.sendEventToPlayers("initData", source);

        setInterval(() => {
            this.players.forEach(async (player, id) => {
                const trustscore = await getPlayerTrustscore(id);
                const playtime = await getPlayerPlaytime(id);

                player.trustscore = trustscore ? trustscore : player.trustscore;
                player.playtime = playtime ? playtime : player.playtime;

                if (player.left) return;

                player.sessionLength += (Config.PLAYER_UPDATE_INTERVAL / 1000);
            });

            this.updatePlayersForClients();
        }, Config.PLAYER_UPDATE_INTERVAL);
    }

    public getPlayers() {
        return this.players;
    }

    public getStaff() {
        return Array.from(this.staff.values());
    }

    public async addPlayer(id: number) {
        if (this.players.has(id)) return false;

        const steam = getPlayerSteam(id);

        if (!steam) return false;

        const player: Player = {
            id,
            name: GetPlayerName(id.toString()),
            steam,
            trustscore: await getPlayerTrustscore(id),
            playtime: await getPlayerPlaytime(id),
            sessionLength: 0,
            joinTime: Date.now(),
        }

        const discord = getPlayerDiscord(id);
        const staffRank = await this.getPlayerRank(discord);

        if (staffRank && Config.STAFF_ROLES[staffRank]) {
            this.addStaff(id, staffRank, discord as string);
        }

        this.players.set(id, player);

        this.updatePlayerForClients(id, player);

        return true;
    }

    public addStaff(id: number, staffRank: TStaffRole, discordId: string) {
        if (this.staff.has(id)) return;

        if (!staffRank) return;

        const staff: InGameStaff = {
            id,
            name: GetPlayerName(id.toString()),
            discordId,
            rank: staffRank
        }

        this.staff.set(id, staff);
    }

    public playerLeft(id: number) {
        const player = this.players.get(id);

        if (!player) return;

        player.left = true;

        this.updatePlayerForClients(id, player);

        setTimeout(() => {
            this.players.delete(id);

            if (this.staff.has(id)) {
                this.staff.delete(id);
            }

            this.updatePlayerForClients(id, null);
        }, Config.LEAVE_TIMEOUT);
    }

    public setActiveReport(id: number, reportNumber: number) {
        const player = this.players.get(id);

        if (!player) return;

        if (player.reportNumber) return;

        player.reportNumber = reportNumber;

        this.sendEventToPlayer("setActiveReport", id, reportNumber);
        this.updatePlayerForClients(id, player);
    }

    public removeActiveReport(id: number, reportNumber: number) {
        const player = this.players.get(id);

        if (!player) return;

        if (player.reportNumber !== reportNumber) return;

        player.reportNumber = undefined;

        this.sendEventToPlayer("setActiveReport", id, null);
        this.updatePlayerForClients(id, player);
    }

    public getPlayer(id: number): Player | undefined {
        return this.players.get(id);
    }

    public getInGameStaff(id: number): InGameStaff | undefined {
        return this.staff.get(id);
    }

    public getInGameStaffByDiscord(discordId: string): InGameStaff | undefined {
        let staff = undefined;
        
        this.staff.forEach((s) => {
            if (s.discordId === discordId) {
                staff = s;
                return;
            }
        });

        return staff;
    }

    public sendEventToPlayers(eventName: string, ...args: any[]) {
        emitNet("FivemReportSystem:client:" + eventName, -1, ...args);
    }

    public sendEventToPlayer(eventName: string, id: number, ...args: any[]) {
        emitNet("FivemReportSystem:client:" + eventName, id, ...args);
    }

    public sendEventToStaff(eventName: string, ...args: any[]) {
        this.staff.forEach((staff) => {
            emitNet("FivemReportSystem:client:" + eventName, staff.id, ...args);
        });
    }

    private updatePlayerForClients(id: number, player: Player | null) {
        this.sendEventToPlayers("updatePlayer", id, player);
    }

    private updatePlayersForClients() {
        this.sendEventToPlayers("updatePlayers", Array.from(this.players.values()));
    }

    private async getPlayerRank(discordId: string | null) {
        if (!discordId) return;

        const roles = await discordManager.getMemberRoles(discordId);
        const role = discordManager.getHighestRole(roles);

        return role.name as TStaffRole;
    }

}

export default PlayerManager;