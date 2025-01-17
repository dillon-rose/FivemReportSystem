import { sortArrayToTimeSlots } from "@/utils/sortArrayToTimeSlots";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { ScrollArea } from "./ui/scroll-area";
import LineChart, { getMonthLabels, getWeekLabels } from "./ui/line-chart";
import { Time } from "@/types/types";
import { CounterClockwiseClockIcon, LapTimerIcon } from "@radix-ui/react-icons";
import BarChart from "./ui/bar-chart";
import { useLoader } from "@/hooks/useLoader";
import { useStaffPlaytime } from "@/hooks/useStaffPlaytime";

type props = {
    staffDiscordId: string;
    timeFilter: Time;
}

const StaffPlaytime = ({ staffDiscordId, timeFilter }: props) => {
    console.log(staffDiscordId);
    const labels = timeFilter == Time.MONTH ? getMonthLabels() : getWeekLabels();
    const [loader] = useLoader(".playtimeLoader");
    const [staffPlaytime] = useStaffPlaytime(staffDiscordId, timeFilter, loader);

    let playtime: number = 0;
    let longestSession: number = 0;

    const sessionStartTimes: [number, number][] = [];

    const playtimePerTimeSlot: [number, number][] = new Array(labels.length).fill(0);

    staffPlaytime?.sessions.forEach(session => {
        const sessionStartTime = session.startTime;

        sessionStartTimes.push([sessionStartTime, 1]);
        playtimePerTimeSlot.push([sessionStartTime, session.length]);

        if (session.length > longestSession) {
            longestSession = session.length;
        }

        playtime += session.length;
    });
    
    return (
        <div className="mt-[1vh] flex flex-col gap-[2vh] h-[54vh] playtimeLoader">
            <ScrollArea className="pr-[2vh]">
                <div className="grid grid-cols-2 gap-[2%]">
                    <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                        <CardContent className="p-[1vh] px-[2vh]">
                            <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                <CardTitle className="text-md">
                                    Playtime
                                </CardTitle>
                                <CounterClockwiseClockIcon className="text-green-500 bg-green-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                            </CardHeader>
                            <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                            {Math.floor(playtime / (60 * 24))} days {Math.floor((playtime / 60) % 24 )} hours {playtime % 60} minutes
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                        <CardContent className="p-[1vh] px-[2vh]">
                            <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                <CardTitle className="text-md">
                                    Longest Session
                                </CardTitle>
                                <LapTimerIcon className="text-pink-500 bg-pink-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full"/>
                            </CardHeader>
                            <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                            {Math.floor(longestSession / (60 * 24))} days {Math.floor((longestSession / 60) % 24 )} hours {longestSession % 60} minutes
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-[2%] mt-[1vh]">
                    <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                        <CardContent className="p-[1vh] px-[2vh]">
                            <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                <CardTitle className="text-md">
                                    Playtime Timeline
                                </CardTitle>
                            </CardHeader>
                            <BarChart<number> data={{
                                labels: labels,
                                datasets: [
                                    {
                                    label: 'Playtime',
                                    data: sortArrayToTimeSlots(playtimePerTimeSlot, timeFilter),
                                    borderColor: 'rgb(28, 255, 82)',
                                    backgroundColor: 'rgb(28, 255, 82, 0.5)',
                                    }
                                ],
                                }}
                                tooltipCb={(label) => {
                                    const time = label;

                                    return `${Math.floor(time / (60 * 24))} days ${Math.floor((time / 60) % 24 )} hours ${time % 60} minutes`;
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-[2%] mt-[1vh]">
                    <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                        <CardContent className="p-[1vh] px-[2vh]">
                            <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                                <CardTitle className="text-md">
                                    Session Timeline
                                </CardTitle>
                            </CardHeader>
                            <LineChart data={{
                                labels: labels,
                                datasets: [
                                    {
                                    label: 'Sessions',
                                    data: sortArrayToTimeSlots(sessionStartTimes, timeFilter),
                                    borderColor: 'rgb(185, 48, 255)',
                                    backgroundColor: 'rgb(185, 48, 255, 0.5)',
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

export default StaffPlaytime;