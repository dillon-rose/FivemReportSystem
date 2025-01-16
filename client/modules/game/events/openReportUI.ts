import { nuiManager } from "@client/modules/nui";

onNet("FivemReportSystem:client:openReportUI", () => {
    nuiManager.toggleNuiFrame(true);
});