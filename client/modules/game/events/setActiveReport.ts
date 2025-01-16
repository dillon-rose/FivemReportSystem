import { nuiManager } from "@client/modules/nui";

onNet("FivemReportSystem:client:setActiveReport", async (reportNumber: number) => {
    nuiManager.SendReactMessage("activeReport", reportNumber);
});