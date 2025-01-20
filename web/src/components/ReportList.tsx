import { Statuses, GameReport } from "@/types/types";
import { ScrollArea } from "./ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { respondToReport } from "@/utils/reportChange";
import { ReactNode } from "react";

interface props {
    reports: GameReport[]
    filter: "all" | "new";
}

const ReportList = ({ reports, filter }: props) => {
    const navigate = useNavigate();

    const onRespond = (reportNumber?: number) => {
        if (reportNumber === undefined) return;

        respondToReport(reportNumber);
    }

    const onInfo = (reportNumber?: number) => {
        if (reportNumber === undefined) return;

        navigate(`/reports/${reportNumber}`);
    }

    return (
        <ScrollArea className="h-full">
            <div className="flex flex-col gap-[1vh] p-[2vh] pt-0 transition-all">
                {reports.reduceRight((arr: ReactNode[], report: GameReport) => {
                    if (!report) return arr;

                    if (filter === "new" && report.status !== Statuses.UNSOLVED) return arr;
                    
                    return (arr = arr.concat(
                        <div
                            key={report.reportNumber}
                            className="flex flex-col items-start gap-[0.5vh] rounded-lg bg-slate-900/70 border border-slate-700 px-[2vh] py-[1.5vh] text-left text-sm transition-all hover:bg-accent"
                        >
                            <div className="flex w-full flex-col gap-[0.5vh] text-lg">
                                <div className="grid grid-cols-[80%_20%]">
                                    <div className="flex items-center gap-[1vh] break-all">
                                        <div className="font-semibold">{report.description.substring(0, 50)}</div>
                                    </div>
                                    <div
                                    className={"ml-auto text-sm"}
                                    >
                                        {formatDistanceToNow(new Date(report.createdAt), {
                                            addSuffix: true,
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="line-clamp-2 text-sm text-muted-foreground text-slate-300">
                                <div>
                                    Creator: [{report.creator.id}] {report.creator.name.substring(0, 50)} 
                                </div>
                                {
                                    report.offender && (
                                        <div>
                                            Offender: [{report.offender?.id}] {report.offender?.name.substring(0, 50)} 
                                        </div>
                                    )
                                }
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <div className="flex gap-2">
                                    <Badge key="status" variant={report.status}>
                                        {report.status}
                                    </Badge>
                                    {
                                        report.result && (
                                            <Badge key="result" variant={report.result}>
                                                {report.result}
                                            </Badge>
                                        )
                                    }
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="secondary" onClick={() => onRespond(report.reportNumber)}>Respond</Button>
                                    <Button size="sm" variant="outline" onClick={() => onInfo(report.reportNumber)}>Info</Button>
                                </div>
                            </div>
                        </div>
                    ));
                }, [])}
            </div>
        </ScrollArea>
    )
}

export default ReportList