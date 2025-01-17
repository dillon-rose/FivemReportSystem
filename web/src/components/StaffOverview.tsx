import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { ScrollArea } from "./ui/scroll-area"
import LineChart, { getMonthLabels, getWeekLabels } from "./ui/line-chart"
import { InfoCircledIcon, BookmarkFilledIcon, CheckCircledIcon, CrossCircledIcon, PlusCircledIcon, TimerIcon } from "@radix-ui/react-icons"
import { StaffStats, Time } from "@/types/types"
import AreaChart from "./ui/area-chart"
import { sortArrayToTimeSlots } from "@/utils/sortArrayToTimeSlots"

type props = {
    staff: StaffStats,
    timeFilter: Time
}

const StaffOverview = ({ staff, timeFilter }: props) => {
    const labels = timeFilter == Time.MONTH ? getMonthLabels() : getWeekLabels();
    const firstResponseTimes: [number, number][] = []
    const responseTimes: [number, number][] = staff.responses.map(resp => {
        if (resp.primaryStaff?.staff.discordId === staff.staff.discordId) {
            firstResponseTimes.push([resp.createdAt, 1]);
        }

        return [resp.createdAt, 1];
    });
    const solvedReportsTimes: [number, number][] = staff.solvedReports.map(report => [report.createdAt, 1]);
    return (
        <div className="mt-[1vh] flex flex-col gap-[2vh] h-[54vh] statisticsLoader">
            <ScrollArea className="pr-[2vh]">
                <div className="grid grid-cols-3 gap-[2%]">
                    <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                        <CardContent className="p-[1vh] px-[2vh]">
                            <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                <CardTitle className="text-md">
                                    Responses
                                </CardTitle>
                                <InfoCircledIcon className="text-yellow-500 bg-yellow-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                            </CardHeader>
                            <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                                {staff.numResponses}
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                        <CardContent className="p-[1vh] px-[2vh]">
                            <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                <CardTitle className="text-md">
                                    First Responses
                                </CardTitle>
                                <BookmarkFilledIcon className="text-blue-500 bg-blue-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                            </CardHeader>
                            <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                                {staff.numFirstResponses}
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                        <CardContent className="p-[1vh] px-[2vh]">
                            <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                <CardTitle className="text-md">
                                    Solved Reports
                                </CardTitle>
                                <CheckCircledIcon className="text-green-500 bg-green-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                            </CardHeader>
                            <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                                {staff.numSolved}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-3 gap-[2%] py-[2vh]">
                    <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                        <CardContent className="p-[1vh] px-[2vh]">
                            <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                <CardTitle className="text-md">
                                    Punishments
                                </CardTitle>
                                <CrossCircledIcon className="text-red-500 bg-red-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                            </CardHeader>
                            <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                                {staff.punishmentCounts.bans + staff.punishmentCounts.kicks + staff.punishmentCounts.warns}
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                        <CardContent className="p-[1vh] px-[2vh]">
                            <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                <CardTitle className="text-md">
                                    Non Punishments
                                </CardTitle>
                                <PlusCircledIcon className="text-green-500 bg-green-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                            </CardHeader>
                            <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                                {staff.punishmentCounts.verbals + staff.punishmentCounts.nothing + staff.punishmentCounts.other}
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                        <CardContent className="p-[1vh] px-[2vh]">
                            <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                <CardTitle className="text-md">
                                    Avg. Wait Time
                                </CardTitle>
                                <TimerIcon className="text-amber-500 bg-amber-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                            </CardHeader>
                            <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                                {Math.floor(staff.avgWaitTime * 10) / 10} second(s)
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-[34%_64%] gap-[2%] mt-[1vh]">
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
                                data: [staff.punishmentCounts.bans, staff.punishmentCounts.kicks, staff.punishmentCounts.warns, staff.punishmentCounts.verbals, staff.punishmentCounts.nothing, staff.punishmentCounts.other],
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
                                    label: 'Total Responses',
                                    data: sortArrayToTimeSlots(responseTimes, timeFilter),
                                    borderColor: 'rgb(185, 48, 255)',
                                    backgroundColor: 'rgb(185, 48, 255, 0.5)',
                                    },
                                    {
                                    label: 'First Responses',
                                    data: sortArrayToTimeSlots(firstResponseTimes, timeFilter),
                                    borderColor: 'rgb(28, 188, 255)',
                                    backgroundColor: 'rgb(28, 188, 255, 0.5)',
                                    },
                                    {
                                    label: 'Solved Reports',
                                    data: sortArrayToTimeSlots(solvedReportsTimes, timeFilter),
                                    borderColor: 'rgb(28, 255, 82)',
                                    backgroundColor: 'rgb(28, 255, 82, 0.5)',
                                    }
                                ],
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    )
}

export default StaffOverview