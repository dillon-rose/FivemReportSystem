import { Results, Statuses } from "@/types/types";
import { toast } from "sonner";
import { fetchNui } from "./fetchNui";

export const updateReportStatus = (reportNumber: number, status:  Statuses) => {
    fetchNui<boolean>('updateReportStatus', { reportNumber, status })
    .then((res) => {
        if (res)
            toast.success('Report status updated successfully');
        else
            toast.error("Failed to update report status");
    })
    .catch((e) => {
        console.error(e);
        toast.error("Failed to update report status");
    });

}

export const updateReportResult = (reportNumber: number, result?:  Results) => {
    fetchNui<boolean>('updateReportResult', { reportNumber, result })
    .then((res) => {
        if (res)
            toast.success('Report result updated successfully');
        else
            toast.error("Failed to update report result");
    })
    .catch((e) => {
        console.error(e);
        toast.error("Failed to update report result");
    });
}

export const solveReport = (reportNumber: number, result: Results) => {
    fetchNui<boolean>('solveReport', { reportNumber, result })
    .then((res) => {
        if (res)
            toast.success('Report solved successfully');
        else
            toast.error("Failed to solve report");
    })
    .catch((e) => {
        console.error(e);
        toast.error("Failed to solve report");
    });
} 

export const transferReport = (reportNumber: number, targetStaff?: string) => {
    if (!targetStaff) return toast.error("Couldn't find staff member to transfer to.");
    
    fetchNui<boolean>('transferReport', { reportNumber, targetStaff })
    .then((res) => {
        if (res)
            toast.success('Report transferred successfully');
        else
            toast.error("Failed to transfer report");
    })
    .catch((e) => {
        console.error(e);
        toast.error("Failed to transfer report");
    });
}

export const respondToReport = (reportNumber: number) => {
    fetchNui<boolean>('respondToReport', { reportNumber })
    .catch((e) => {
        console.error(e);
    });
}