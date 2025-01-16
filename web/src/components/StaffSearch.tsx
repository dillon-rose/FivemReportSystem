import { Time } from '../types/types';
import { ScrollArea } from './ui/scroll-area';
import SectionBody from './SectionBody';
import StaffTable from './StaffTable';
import { useLoader } from '@/hooks/useLoader';
import { useNavigate } from 'react-router-dom';
import { useAllStaff } from '@/hooks/useAllStaff';



type Props = {
  timeFilter: Time,
}

const StaffSearch = ({ timeFilter }: Props) => {
  const navigate = useNavigate();
  const [setIsLoading] = useLoader(".staffLoader");
  const [staffData] = useAllStaff(timeFilter, setIsLoading);

  function playerSelected(staffId: string) {
    navigate(`/stats/${staffId}`);
  }

  return (
    <SectionBody>
        <ScrollArea>
          <div className="pb-[1vh] pr-[2vh] flex flex-col h-[50vh]">
            <StaffTable data={staffData} onSelect={playerSelected} classname='setIsLoading'/>
          </div>
        </ScrollArea>
    </SectionBody>
  )
}

export default StaffSearch
