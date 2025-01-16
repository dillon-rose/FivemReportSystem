import { GameReport } from "@/types/types"
import { Card, CardContent } from "./ui/Card"
import { cn } from "@/utils/cn"
import { ScrollArea } from "./ui/scroll-area"
import Screenshot from "./Screenshot"
import AttatchedStaffDisplay from "./AttatchedStaffDisplay"
import { Separator } from "./ui/separator"

type props = {
    report: GameReport
}

const ReportOverview = ({ report }: props) => {

  return (
      <Card className="dark:bg-slate-900/70 h-[54vh] w-full">
        <ScrollArea>
          <CardContent className="p-[2vh] flex flex-col gap-[2vh] h-[53vh]">
            <Card>
              <div className="flex m-[1vh] mx-[1vw] text-md">
                <div className="font-semibold">
                  Description:
                </div>
                <div
                className="ml-auto text-slate-400 text-sm"
                >
                    Created: {new Date(report.createdAt).toLocaleString("en-US", { timeZone: "America/New_York" })} EDT
                </div>
              </div>  
              <Separator />
              <div className="flex items-center break-all m-[1vh] mx-[1vw]">
                <div className="font-normal text-sm">{report.description}</div>
              </div>
            </Card>
            <div className={cn("grid gap-[2vh]", report.offender ? "grid-cols-2 " : "grid-cols-1")}>
              <Card className="creatorLoader">
                <div className="text-md m-[1vh] mx-[1vw] font-semibold flex gap-[0.5vw]">
                  Creator:
                  <div className="flex items-center gap-2 break-all">
                      <div className="font-normal">{report.creator.name}</div>
                  </div>
                </div>
                <Separator />
                <div className="m-[1vh] mx-[0.5vw]">
                  <Screenshot screenshot={report.screenshots.creator} />
                </div>
              </Card>
              {report.offender && (
                <Card className=" offenderLoader">
                  <div className="text-md m-[1vh] mx-[1vw] font-semibold flex gap-[0.5vw]">
                    Offender:
                    <div className="flex items-center gap-2 break-all">
                        <div className="font-normal">{report.offender.name}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="m-[1vh] mx-[0.5vw]">
                    <Screenshot screenshot={report.screenshots.offender || ""} />
                  </div>
                </Card>
              )}
            </div>
            <div>
              <AttatchedStaffDisplay primaryStaff={report.primaryStaff} attatchedStaff={report.attatchedStaff} classname="mb-[1vh]" />
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
  )
}

export default ReportOverview