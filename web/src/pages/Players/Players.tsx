import PlayerList from "@/components/PlayerList";
import SectionBody from "@/components/SectionBody";
import SectionHeader from "@/components/SectionHeader";
import { useLoader } from "@/hooks/useLoader";
import { usePlayerCount } from "@/hooks/usePlayerCount";
import { usePlayers } from "@/hooks/usePlayers";
import { useNavigate } from "react-router-dom";

const Players = () => {
  const navigate = useNavigate();
  const [playersLoader] = useLoader(".playerLoader");
  const [playerCount, maxPlayers] = usePlayerCount(0, 100);
  const [players] = usePlayers(playersLoader);

  const gotoPlayer = (playerId: number) => {
    navigate(`/players/${playerId}`);
  }

  const gotoActiveReport = (reportId: number) => {
    navigate(`/reports/${reportId}`);
  }

  return (
    <>
      <SectionHeader classname="justify-between">
        <h1 className='font-sans font-medium text-[4vh] text-center'>Player List:</h1>
        <h1 className='font-sans font-normal text-[3vh] text-center'>Players: {playerCount}/{maxPlayers}</h1>
      </SectionHeader>
      <SectionBody classname="playerLoader">
        <PlayerList players={players} onPlayerClick={(player) => gotoPlayer(player.id)} onReportClick={(reportId) => gotoActiveReport(reportId)}/>
      </SectionBody>
    </>
  )
}

export default Players