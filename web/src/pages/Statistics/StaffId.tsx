import ErrorPage from "@/components/ErrorPage";
import SectionBody from "@/components/SectionBody";
import SectionHeader from "@/components/SectionHeader";
import { Separator } from "@/components/ui/separator";
import { useLoader } from "@/hooks/useLoader";
import { useStaff } from "@/hooks/useStaff";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Time, TRating, Staff as TStaff } from '../../types/types';
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffOverview from "@/components/StaffOverview";
import StaffResponses from "@/components/StaffResponses";
import StaffSolvedReports from "@/components/StaffSolvedReports";
import StaffNotes from "@/components/StaffNotes";
import StaffNote from "@/components/StaffNote";
import { fetchNui } from "@/utils/fetchNui";
import { toast } from "sonner";

const Staff = () => {
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [staffPageLoader] = useLoader(".staffPageLoader");
    const [timeFilter, setTimeFilter] = useState<Time>(Time.WEEK);
    const [staff] = useStaff(staffId, timeFilter, staffPageLoader);
    const [sectionFilter, setSectionFilter] = useState<"overview" | "responses" | "solved" | "notes">("overview");

    function addNote(staff: TStaff, rating: TRating, note: string) {
        fetchNui<boolean>('addNote', { reportNumber: null, staffId: staff.discordId, rating, note })
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

    if (!staff || !staffId) return <ErrorPage message={`Couldn't get Player [player #${staffId}]`}/>

    return (
        <>
            <SectionHeader classname="justify-between grid grid-cols-[7%_93%] ml-0">
                <div className="flex hover:cursor-pointer h-full w-full items-center justify-between" onClick={() => navigate(-1)}>
                    <ChevronLeft className="h-full w-full p-[1.5vh]" />
                    <Separator orientation="vertical" className="my-4"/>
                </div>
                <div className="flex justify-between items-center pl-[1vw] gap-[1vw]">
                    <h1 className='font-sans font-medium text-[4vh] text-center whitespace-nowrap overflow-hidden'>Staff: {staff.staff.name}</h1>
                    <div className="flex gap-[1vh] hover:cursor-pointer h-full items-center justify-between">
                        <Tabs defaultValue={timeFilter} onValueChange={(value: string) => setTimeFilter(value as Time)} className="flex items-end">
                            <TabsList className="ml-auto">
                                <TabsTrigger
                                value={Time.WEEK}
                                className="text-zinc-600 dark:text-zinc-200"
                                >
                                Weekly
                                </TabsTrigger>
                                <TabsTrigger
                                value={Time.MONTH}
                                className="text-zinc-600 dark:text-zinc-200"
                                >
                                Monthly
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </SectionHeader>
            <SectionBody classname="staffPageLoader">
                <div className="flex justify-between items-center mr-[1vh]">
                    <Tabs defaultValue={sectionFilter} onValueChange={(value) => setSectionFilter(value as ("overview" | "responses" | "solved"))}>
                        <TabsList className="ml-auto">
                            <TabsTrigger
                            value="overview"
                            className="text-zinc-600 dark:text-zinc-200"
                            >
                            Overview
                            </TabsTrigger>
                            <TabsTrigger
                            value="responses"
                            className="text-zinc-600 dark:text-zinc-200"
                            >
                            Responses
                            </TabsTrigger>
                            <TabsTrigger
                            value="solved"
                            className="text-zinc-600 dark:text-zinc-200"
                            >
                            Solved
                            </TabsTrigger>
                            <TabsTrigger
                            value="notes"
                            className="text-zinc-600 dark:text-zinc-200"
                            >
                            Notes
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <StaffNote staffMember={staff.staff} onSubmit={addNote} />
                </div>
                {
                (sectionFilter === "overview" && (
                    <StaffOverview staff={staff} timeFilter={timeFilter} />
                )) 
                || (sectionFilter === "responses" && (
                    <StaffResponses data={staff.responses}/>
                ))
                || (sectionFilter === "solved" && (
                    <StaffSolvedReports data={staff.solvedReports}/>
                ))
                || (sectionFilter === "notes" && (
                    <StaffNotes notes={staff.notes}/>
                ))
                }
                
            </SectionBody>
        </>
    )
}

export default Staff;