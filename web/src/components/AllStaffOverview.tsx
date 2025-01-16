import { CheckCircledIcon, ExclamationTriangleIcon, TimerIcon } from "@radix-ui/react-icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import AreaChart from "./ui/area-chart";
import { ScrollArea } from "./ui/scroll-area";
import LineChart, { getMonthLabels, getWeekLabels } from "./ui/line-chart";
import { useLoader } from "@/hooks/useLoader";
import { Time } from '../types/types';
import { useAllStaff } from "@/hooks/useAllStaff";
import { memo, useMemo } from "react";
import { useReportTimes } from "@/hooks/useReportTimes";

type props = {
    timeFilter: Time,
}

const AllStaffOverview = memo(({ timeFilter }: props) => {
    const labels = timeFilter == Time.MONTH ? getMonthLabels() : getWeekLabels();

    const [staffDataLoader] = useLoader(".staffDataLoader");
    const [staffStats] = useAllStaff(timeFilter, staffDataLoader);
    const [reportDataLoader] = useLoader(".reportDataLoader");
    const [reportTimes, punishmentTimes, nonPunishmentTimes] = useReportTimes(timeFilter, reportDataLoader);
    
    let totalReports = reportTimes.reduce((a, b) => a + b, 0);
    let totalSolved = 0;
    let totalResponses = 0;
    let ban = 0;
    let kick = 0;
    let warn = 0;
    let verbal = 0;
    let nothing = 0;
    let other = 0;
    
    for (const staff of staffStats) {
        totalSolved += staff.numSolved;
        totalResponses += staff.numResponses;

        ban += staff.punishmentCounts.bans;
        kick += staff.punishmentCounts.kicks;
        warn += staff.punishmentCounts.warns;
        verbal += staff.punishmentCounts.verbals;
        nothing += staff.punishmentCounts.nothing;
        other += staff.punishmentCounts.other;
    }

    return (
        <div className="mt-[2vh] flex flex-col gap-[2vh] h-[53vh] statisticsLoader reportDataLoader">
            <ScrollArea>
                <div className="staffDataLoader mr-[2vh]">
                    <div className="grid grid-cols-3 gap-[2%]">
                        <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                            <CardContent className="p-[1vh] px-[2vh]">
                                <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                    <CardTitle className="text-md">
                                        Total Reports
                                    </CardTitle>
                                    <ExclamationTriangleIcon className="text-red-500 bg-red-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                                </CardHeader>
                                <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                                    {totalReports}
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                            <CardContent className="p-[1vh] px-[2vh]">
                                <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                    <CardTitle className="text-md">
                                        Total Solved
                                    </CardTitle>
                                    <CheckCircledIcon className="text-green-500 bg-green-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                                </CardHeader>
                                <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                                    {totalSolved}
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                            <CardContent className="p-[1vh] px-[2vh]">
                                <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                    <CardTitle className="text-md">
                                        Total Responses
                                    </CardTitle>
                                    <TimerIcon className="text-amber-500 bg-amber-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                                </CardHeader>
                                <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                                    { totalResponses}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid grid-cols-[34%_64%] gap-[2%] mt-[2vh]">
                        <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                            <CardContent className="p-[1vh] px-[2vh]">
                                <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                    <CardTitle className="text-md">
                                        Report Results
                                    </CardTitle>
                                </CardHeader>
                                <AreaChart data={{
                                labels: ["Ban", "Kick", "Warn", "Verbal", "Nothing", "Other"],
                                datasets: [
                                    {
                                    data: [ban, kick, warn, verbal, nothing, other],
                                    backgroundColor: [
                                        "rgb(255, 48, 48, 0.5)",
                                        "rgb(255, 138, 48, 0.5)",
                                        "rgb(255, 198, 48, 0.5)",
                                        "rgb(185, 48, 255, 0.5)",
                                        "rgb(48, 144, 255, 0.5)",
                                        "rgb(48, 255, 198, 0.5)",
                                    ],
                                    borderColor: [
                                        "rgb(255, 48, 48)",
                                        "rgb(255, 138, 48)",
                                        "rgb(255, 198, 48)",
                                        "rgb(185, 48, 255)",
                                        "rgb(48, 144, 255)",
                                        "rgb(48, 255, 198)",
                                    ],
                                    borderWidth: 1,
                                    },
                                ],
                                }} 
                            />
                            </CardContent>
                        </Card>
                        
                        <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                            <CardContent className="p-[1vh] px-[2vh]">
                                <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                    <CardTitle className="text-md">
                                        Reports Timeline
                                    </CardTitle>
                                </CardHeader>
                                <LineChart data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                        label: 'Total Reports',
                                        data: reportTimes,
                                        borderColor: 'rgb(255, 198, 48)',
                                        backgroundColor: 'rgb(255, 198, 48, 0.5)',
                                        },
                                        {
                                        label: 'Punishment Given',
                                        data: punishmentTimes,
                                        borderColor: 'rgb(255, 48, 48)',
                                        backgroundColor: 'rgb(255, 48, 48, 0.5)',
                                        },
                                        {
                                        label: 'No Punishment',
                                        data: nonPunishmentTimes,
                                        borderColor: 'rgb(185, 48, 255)',
                                        backgroundColor: 'rgb(185, 48, 255, 0.5)',
                                        }
                                    ],
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
})

export default AllStaffOverview