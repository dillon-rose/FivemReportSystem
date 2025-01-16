import { nuiManager } from "@client/modules/nui";

export function notify(type: "success" | "error" | "info" | "report", message: string) {
    nuiManager.SendReactMessage('notify', { type, message });
}
