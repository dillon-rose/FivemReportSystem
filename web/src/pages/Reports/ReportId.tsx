import ErrorPage from "@/components/ErrorPage"
import ReportInfo from "@/components/ReportInfo"
import StaffNote from "@/components/StaffNote"
import ReportSettings from "@/components/ReportSettings"
import SectionBody from "@/components/SectionBody"
import SectionHeader from "@/components/SectionHeader"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { StateContext } from "@/providers/ContextProvider"
import { useGameReportsContext } from "@/providers/GameReportsProvider"
import { GameReport, Permission, Staff, Statuses, TRating, TReport } from "@/types/types"
import { fetchNui } from "@/utils/fetchNui"
import { ChevronLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { useContext } from "react"


const Report = () => {
  const { reportNumber } = useParams();
  const navigate = useNavigate();
  const context = useContext(StateContext);
  const reportsContext = useGameReportsContext();

  if (!reportNumber) return <ErrorPage message="No report number provided"/>

  const report = reportsContext.getReport(parseInt(reportNumber));

  if (!report) return <ErrorPage message={`Couldn't get report: [report #${reportNumber}]`}/>

  function addNote(staff: Staff, rating: TRating, note: string) {
    fetchNui<boolean>('addNote', { reportNumber: parseInt(reportNumber as string), staffId: staff.discordId, rating, note })
    .then((res) => {
      if (res)
        toast.success('Note added successfully');
      else
        toast.error("Failed to add note");
    })
    .catch((e) => {
      console.error(e);
      toast.error("Failed to add note");
    });
  }

  return (
    <>
      <SectionHeader classname="justify-between grid grid-cols-[7%_93%] ml-0">
        <div className="flex hover:cursor-pointer h-full w-full items-center justify-between" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-full w-full p-[1.5vh]" />
          <Separator orientation="vertical" className="my-4"/>
        </div>
        <div className="flex justify-between items-center pl-[1vw]">
          <div className="flex items-baseline gap-[1vh]">
            <h1 className='font-sans font-medium text-[4vh] text-center'>Report #{parseInt(reportNumber) + 1}</h1>
            {report.status === Statuses.SOLVED && <h3 className="font-sans text-gray-500 text-sm">Solved By: {report.solvedBy?.name}</h3>}
          </div>
          
          <div className="flex gap-[1vh] hover:cursor-pointer h-full items-center justify-between">
            <Badge variant={report.status}>
              {report.status}
            </Badge>
            {
              report.result && (
                <Badge variant={report.result}>
                  {report.result}
                </Badge>
              )
            }
            {context.permission <= Permission.MODERATOR && 
              <StaffNote staffMembers={report.attatchedStaff.concat(report.primaryStaff ? [report.primaryStaff] : [])} onSubmit={addNote}/>
            }

            {context.permission === Permission.ADMIN && report.status === Statuses.SOLVED && 
              <ReportSettings reportNumber={parseInt(reportNumber)} status={report.status} result={report.result}/>
            }
          </div>
        </div>
      </SectionHeader>
      <SectionBody>
        <ReportInfo report={report} />
      </SectionBody>
    </>
  )
}

export default Report