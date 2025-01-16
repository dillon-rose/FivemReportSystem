import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { GameReport } from "@/types/types";
import ReportOverview from "./ReportOverview";
import ReportPlayerInfo from "./ReportPlayerInfo";
import ReportActionButtons from "./ReportActionButtons";

type props = {
  report: GameReport
}

const ReportInfo = ({ report }: props) => {
  const [filter, setFilter] = useState<"overview" | "creator" | "offender">("overview");

  return (
    <div className="px-[1vw]">
      <div className="flex justify-between items-center h-[6vh]">
        <Tabs defaultValue={filter} onValueChange={(value) => setFilter(value as ("overview" | "creator" | "offender"))}>
          <TabsList className="ml-auto">
            <TabsTrigger
              value="overview"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="creator"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Creator
            </TabsTrigger>
            {
              report.offender && (
                <TabsTrigger
                  value="offender"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Offender
                </TabsTrigger>
              )
            }
          </TabsList>
        </Tabs>
        <ReportActionButtons report={report}/>
      </div>
      <div className="my-[1vh]">
        {
          filter === "overview" && (<ReportOverview report={report} />)
        }
        {
          filter === "creator" && (<ReportPlayerInfo screenshot={report.screenshots.creator} player={report.creator} creator/>)
        }
        {
          report.offender && filter === "offender" && (<ReportPlayerInfo screenshot={report.screenshots.offender || ""} player={report.offender} />)
        }
      </div>
      
    </div>
  )
}

export default ReportInfo