import SectionHeader from '@/components/SectionHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react'
import { useLoader } from '../../hooks/useLoader';
import ReportList from '@/components/ReportList';
import SectionBody from '@/components/SectionBody';
import { useGameReportsContext } from '@/providers/GameReportsProvider';

const Reports = () => {
  const [filter, setFilter] = useState<"all" | "new">("all");
  const reportsContext = useGameReportsContext();
  const reports = reportsContext.getReports();

  return (
    <>
      <SectionHeader classname='justify-between'>
        <h1 className='font-sans font-medium text-[4vh] text-center'>Report List:</h1>
        <Tabs defaultValue={filter} onValueChange={(value) => setFilter(value as ("all" | "new"))}>
          <TabsList className="ml-auto">
            <TabsTrigger
              value="all"
              className="text-zinc-600 dark:text-zinc-200"
            >
              All Reports
            </TabsTrigger>
            <TabsTrigger
              value="new"
              className="text-zinc-600 dark:text-zinc-200"
            >
              New Reports
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </SectionHeader>
      <SectionBody classname='reportsLoader'>
        <ReportList reports={reports || []} filter={filter}/>
      </SectionBody>
    </>
  )
}

export default Reports