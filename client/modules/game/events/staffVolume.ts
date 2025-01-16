import { nuiManager } from "@client/modules/nui";

onNet("FivemReportSystem:client:staffVolume", (volume: number) => {
    nuiManager.SendReactMessage("setVolume", volume);
});