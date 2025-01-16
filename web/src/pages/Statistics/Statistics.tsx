import SectionBody from "@/components/SectionBody";
import SectionHeader from "@/components/SectionHeader";
import AllStaffOverview from "@/components/AllStaffOverview";
import StaffSearch from "@/components/StaffSearch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Time } from '../../types/types';

const Statistics = () => {
  const [timeFilter, setTimeFilter] = useState<Time>(Time.WEEK);
  const [sectionFilter, setSectionFilter] = useState<"overview" | "staff">("overview");

  return (
    <>
      <SectionHeader classname='justify-between'>
        <h1 className='font-sans font-medium text-[4vh] text-center'>Statistics:</h1>
        <Tabs defaultValue={timeFilter} onValueChange={(value: string) => setTimeFilter(value as Time)}>
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
      </SectionHeader>
      <SectionBody classname='reportsLoader px-[1.4vw]'>
        <Tabs defaultValue={sectionFilter} onValueChange={(value) => setSectionFilter(value as ("overview" | "staff"))}>
          <TabsList className="ml-auto">
            <TabsTrigger
              value="overview"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="staff"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Staff Members
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {
          (sectionFilter === "overview" && (
            <AllStaffOverview timeFilter={timeFilter}/>
          )) 
          || (sectionFilter === "staff" && (
            <StaffSearch timeFilter={timeFilter} />
          ))

        }
      </SectionBody>
    </>
  )
}

export default Statistics