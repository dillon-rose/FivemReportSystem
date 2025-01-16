import ErrorPage from "@/components/ErrorPage";
import ExternalLink from "@/components/ExternalLink";
import PlayerReportTables from "@/components/PlayerReportTables";
import SectionBody from "@/components/SectionBody";
import SectionHeader from "@/components/SectionHeader";
import { Separator } from "@/components/ui/separator";
import { useLoader } from "@/hooks/useLoader";
import { usePlayer } from "@/hooks/usePlayer";
import { hexToDecimal } from "@/utils/hexToDecimal";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { type Player as TPlayer, type Staff, type TRating, Permission } from "@/types/types";
import { fetchNui } from "@/utils/fetchNui";
import { toast } from "sonner";
import { useStaff } from "@/hooks/useStaff";
import { useInGameStaff } from "@/hooks/useInGameStaff";
import StaffNote from "@/components/StaffNote";
import { StateContext } from "@/providers/ContextProvider";
import { useContext } from "react";

const Player = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const context = useContext(StateContext);
  const [playerCreatedLoader, isLoading] = useLoader(".playerCreatedLoader");
  const [playerData] = usePlayer(parseInt(playerId || "0") || 0, playerCreatedLoader);
  const [staff] = useInGameStaff(parseInt(playerId || "0"));

  const dummyPlayer: TPlayer = {
    id: parseInt(playerId || "0"),
    name: "",
    steam: "0",
  }

  function addNote(staff: Staff, rating: TRating, note: string) {
    if (!staff || !staff.discordId) return;

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

  if ((!isLoading && !playerData) || !playerId) return <ErrorPage message={`Couldn't get Player [player #${playerId}]`}/>

  const player = playerData || dummyPlayer;

  return (
    <>
      <SectionHeader classname="justify-between grid grid-cols-[7%_93%] ml-0">
        <div className="flex hover:cursor-pointer h-full w-full items-center justify-between" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-full w-full p-[1.5vh]" />
          <Separator orientation="vertical" className="my-4"/>
        </div>
        <div className="flex justify-between items-center pl-[1vw] gap-[1vw]">
          <h1 className='font-sans font-medium text-[4vh] text-center whitespace-nowrap overflow-hidden'>Player: {player.name}</h1>
          <div className="flex items-center gap-[1vh]">
            <div className="flex gap-[1vh] hover:cursor-pointer h-full items-center justify-between">
              <ExternalLink classname="px-[0.5vw]" variant="blue" link={`https://steamcommunity.com/profiles/${hexToDecimal(player.steam).toString()}`}>{player.steam}</ExternalLink>
            </div>
            {
              context.permission <= Permission.MODERATOR && staff &&
              <StaffNote staffMember={staff} onSubmit={addNote} />
            }
          </div>
        </div>
      </SectionHeader>
      <SectionBody>
        <PlayerReportTables playerHex={player.steam} />
      </SectionBody>
    </>
  )
}

export default Player