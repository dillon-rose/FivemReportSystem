import { useLoader } from "@/hooks/useLoader";
import { usePlayerReports } from "@/hooks/usePlayerReports";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Separator } from "./ui/separator";
import ReportsCreatedTable from "./ReportsTable";
import { ScrollArea } from "./ui/scroll-area";

type props = {
    playerHex: string
}

const PlayerReportTables = ({ playerHex }: props) => {
    const [playerReportsLoader] = useLoader(".playerReportsLoader");
    const [reports] = usePlayerReports(playerHex, playerReportsLoader);
  
    return (
      <Card className="dark:bg-slate-900/70 h-[61vh] w-full">
        <ScrollArea>
          <CardContent className="p-[2vh] flex flex-col gap-[2vh] h-[60vh] text-slate-900">
              <div className="flex gap-[2vh] w-full pb-[1vh]">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Created Reports:</CardTitle>
                  </CardHeader>
                  <Separator />
  
                  <ReportsCreatedTable classname="playerReportsLoader" playerHex={playerHex} creator data={reports}/>
                  
                </Card>
              </div>
              <div className="flex gap-[2vh] w-full pb-[1vh]">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Accused Reports:</CardTitle>
                  </CardHeader>
                  <Separator />
  
                  <ReportsCreatedTable classname="playerReportsLoader" playerHex={playerHex} data={reports}/>
                  
                </Card>
              </div>
          </CardContent>
        </ScrollArea>
      </Card>
    )
}

export default PlayerReportTables;