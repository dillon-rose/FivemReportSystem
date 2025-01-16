import { game } from "@server/modules/game";

export function success(source: number, message: string) {
    game.playerManager.sendEventToPlayer("notify", source, "success", message);
}

export function error(source: number, message: string) {
    game.playerManager.sendEventToPlayer("notify", source, "error", message);
}

export function info(source: number, message: string) {
    game.playerManager.sendEventToPlayer("notify", source, "info", message);
}

export function reportNotify(source: number, message: string) {
    game.playerManager.sendEventToPlayer("notify", source, "report", message);
}