import { nuiManager } from "@client/modules/nui";
import { Player } from "@common/types";

class PlayerManager {
    private players: Map<number, Player>;

    constructor() {
        this.players = new Map<number, Player>();
    }

    public getPlayerCount(): number {
        return this.players.size;
    }

    public getPlayers(): Player[] {
        return Array.from(this.players.values());
    }

    public setPlayer(id: number, player: Player | null) {
        if (!player) {
            this.removePlayer(id);
            return;
        }

        this.players.set(id, player);

        nuiManager.SendReactMessage("updatePlayers", Array.from(this.players.values()));
    }

    public removePlayer(id: number) {
        this.players.delete(id);

        nuiManager.SendReactMessage("updatePlayers", Array.from(this.players.values()));
        nuiManager.SendReactMessage("updatePlayerCount", this.players.size);
    }

    public updatePlayers(newPlayers: Player[]) {
        this.players.clear();

        for (const player of newPlayers) {
            this.players.set(player.id, player);
        }

        nuiManager.SendReactMessage("updatePlayers", Array.from(this.players.values()));
        nuiManager.SendReactMessage("updatePlayerCount", this.players.size);
    }
}

export default PlayerManager;