import { TReport } from "@/types/types"
import StaffReportsTable from "./StaffReportsTable"
import { ScrollArea } from "./ui/scroll-area"

type props = {
    data: TReport[],
}

const StaffSolvedReports = ({ data }: props) => {
    return (
        <div className="mt-[1vh] flex flex-col gap-[2vh] h-[54vh] statisticsLoader">
            <ScrollArea className="pr-[2vh]">
                <StaffReportsTable data={data} />
            </ScrollArea>
        </div>
    )
}

export default StaffSolvedReports