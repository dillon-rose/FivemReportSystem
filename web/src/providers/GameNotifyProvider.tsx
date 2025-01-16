import { useNuiEvent } from "@/hooks/useNuiEvent"
import { toast } from "sonner";
import reportSound from "../assets/notify.mp3";
import { useEffect, useRef, useState } from "react";

const GameNotifyProvider = () => {
    const [volume, setVolume] = useState<number>(localStorage.getItem('volume') !== null ? Number(localStorage.getItem('volume')) : 1);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    useNuiEvent<number>('setVolume', (data) => {
        setVolume(data);
        localStorage.setItem('volume', data.toString());
    });

    useNuiEvent<{ type: "success" | "error"  | "info" | "report", message: string}>('notify', notify);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    function notify({type, message}: { type: "success" | "error"  | "info" | "report", message: string}) {
        switch (type) {
            case "success":
                toast.success(message, {
                    style: {
                        background: "#00290b",
                        color: "#8dfcab",
                    },
                    position: "top-center",
                    duration: 5000,
                });
                break;
            case "error":
                toast.error(message, {
                    style: {
                        background: "#360103",
                        color: "#fcacb0",
                    },
                    position: "top-center",
                    duration: 5000,
                });
                break;
            case "info":
                toast.info(message, {
                    richColors: true,
                    position: "top-center",
                    duration: 5000,
                });
                break;
            case "report":
                toast.warning("New Report!", {
                    style: {
                        background: "#1c0f00",
                        color: "#fabb7f",
                        fontSize: "1.7vh"
                    },
                    position: "top-center",
                    duration: 5000,
                    description: message,
                    descriptionClassName: "description",
                });

                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch((err) => {
                        console.error("Failed to play the audio:", err);
                    });
                }
                break;
        }
    }

    return (
        <audio ref={audioRef}  src={reportSound} itemType="audio/mp3" muted={volume === 0}/>
    )
}

export default GameNotifyProvider