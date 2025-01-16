import { notify } from "@client/utils/notify";

onNet("FivemReportSystem:client:notify", (type: "success" | "error" | "info" | "report", message: string) => {
    notify(type, message);
});