import { Player, Results, Statuses } from "@/types/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { ScrollArea } from "./ui/scroll-area"
import { hexToDecimal } from "@/utils/hexToDecimal"
import ExternalLink from "./ExternalLink"
import ReportsCreatedTable from './ReportsTable';
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import Screenshot from "./Screenshot"
import { useLoader } from "@/hooks/useLoader"
import { Separator } from "./ui/separator"
import { usePlayerReports } from "@/hooks/usePlayerReports"

type props = {
    screenshot?: string,
    player: Player,
    creator?: boolean
}

const ReportPlayerInfo = ({ screenshot, player, creator }: props) => {
  const navigate = useNavigate();

  const [playerReportsLoader] = useLoader(".playerReportsLoader");
  const [reports] = usePlayerReports(player.steam, playerReportsLoader);

  const onPlayerClick = (id: number) => {
    navigate(`/players/${id}`);
  }

  return (
    <Card className="dark:bg-slate-900/70 h-[54vh] w-full">
      <ScrollArea>
        <CardContent className="p-[2vh] flex flex-col gap-[2vh] h-[53vh] text-slate-900">
          <div className="flex flex-col gap-[2vh] h-full">
            <Card className="p-[2vh]">
              <CardContent className="p-0 text-sm font-semibold text-slate-200 grid grid-cols-[60%_40%]">
                <div className="flex flex-col">
                  <div className="flex text-lg gap-[0.5vw] whitespace-nowrap">
                    Player Name: 
                    <div className="font-normal text-lg p-0 pl-[0.3vw] break-all whitespace-normal hover:cursor-pointer hover:underline" onClick={()=>onPlayerClick(player.id)}>
                        [{player.id}] {player.name}
                      </div>
                  </div>
                  <div className="flex text-slate-400 gap-[0.5vw] items-center">
                    Steam: <ExternalLink link={`https://steamcommunity.com/profiles/${hexToDecimal(player.steam).toString()}`} classname="font-normal text-slate-400">{player.steam}</ExternalLink>
                  </div>
                  {player.trustscore !== undefined && (
                      <div className="flex h-[4vh] text-slate-400 gap-[0.5vw] items-center">
                        Trustscore: <p className="font-normal text-slate-400">{player.trustscore}%</p>
                      </div>
                  )}
                  {player.playtime !== undefined && (
                      <div className="flex h-[4vh] text-slate-400 gap-[0.5vw] items-center">
                        Playtime: <p className="font-normal text-slate-400">{Math.floor(player.playtime / 24)} days {player.playtime % 24} hours</p>
                      </div>
                  )}
                </div>
                <div className="playerTabLoader justify-center items-center flex">
                  <Screenshot screenshot={screenshot || ""} classname="h-[70%] w-[70%]"/>
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-[2vh] w-full pb-[1vh]">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{creator ? "Created" : "Accused"} Reports:</CardTitle>
                </CardHeader>
                <Separator />

                <ReportsCreatedTable classname="playerReportsLoader" playerHex={player.steam} creator={creator} data={reports}/>
                
              </Card>
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}

export default ReportPlayerInfo