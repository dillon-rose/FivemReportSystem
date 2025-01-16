import { Player } from "@/types/types"
import { HoverEffect } from "./ui/card-hover-effect"
import { Card, CardContent, CardDescription, CardTitle } from "./ui/Card";
import { CircleAlert, CircleArrowLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/utils/cn";

type props = {
    players: Player[],
    onPlayerClick: (item: Player) => void;
    onReportClick: (reportId: number) => void;
}

const PlayerList = ({ players, onPlayerClick, onReportClick }: props) => {

  return (
    <ScrollArea className="h-full bg-slate-900/70 border border-slate-700 rounded-lg">
        <HoverEffect items={players} onClick={onPlayerClick} mapFunc={(player) => (
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger className="flex h-full w-full">
                        <Card className={cn("h-full w-full overflow-hidden relative z-20 px-[0.8vw] py-[1vh]", player.left ? "dark:bg-slate-700/50 bg-slate-700/50 border-dashed" : "bg-slate-800/70 dark:bg-slate-800/70")}>
                            <CardDescription className="text-[1.5vh] flex justify-between hover:cursor-pointer h-full items-center">
                                [{player.id}] {player.name.substring(0,15)}
                                <div className="flex justify-end">
                                    {player.left && (
                                        <CircleArrowLeft 
                                            className="h-[2.5vh] text-orange-500 animate-pulse hover:animate-none"
                                        />
                                    )}
                                </div>
                            </CardDescription>
                        </Card>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={5} className="flex flex-col gap-[0.5vh]">
                        {
                            player.left && (
                                <div className="flex items-center justify-center gap-[1vh] mb-[0.5vh]">
                                    <CircleArrowLeft 
                                        className="h-[2vh] text-orange-500 animate-pulse hover:animate-none"
                                    />
                                    <p className="text-sm text-slate-500">Not in game</p>
                                </div>
                            )
                        }
                        {player.trustscore !== undefined && (
                            <div>
                                Trustscore:
                                <p className="text-sm text-slate-400">{player.trustscore}%</p>
                            </div>
                        )}
                        {player.playtime !== undefined && (
                            <div>
                                Playtime:
                                <p className="text-sm text-slate-400"> {Math.floor(player.playtime / 24)} days {player.playtime % 24} hours</p>
                            </div>
                        )}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )}/>
    </ScrollArea>
  )
}

export default PlayerList