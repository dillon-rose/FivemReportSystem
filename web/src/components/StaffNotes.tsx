import { ScrollArea } from './ui/scroll-area'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Smile, Meh, Frown } from 'lucide-react'
import { useLoader } from '@/hooks/useLoader'
import { Note, Staff, Time, TRating } from '@/types/types'
import { useState } from 'react'
import { cn } from '@/utils/cn'
import { Button } from './ui/button'
import NoteCard from './NoteCard'

type props = {
    notes: Note[]
}

const StaffNotes = ({ notes }: props) => {
    const [focusedResult, setFocusedResult] = useState<TRating | null>(null);

    let positive = 0;
    let negative = 0;
    let neutral = 0;

    notes.forEach(note => {
        if (note.rating === TRating.POSITIVE) positive++;
        else if (note.rating === TRating.NEGATIVE) negative++;
        else neutral++;
    });

    return (
        <>
            <div className="grid grid-cols-3 gap-[2%] my-[1vh]">
                <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                    <CardContent className="p-[1vh] px-[2vh]">
                        <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                            <CardTitle className="text-md">
                                Positive
                            </CardTitle>
                            <Smile onClick={() => setFocusedResult(focusedResult === TRating.POSITIVE ? null : TRating.POSITIVE)} className={cn(focusedResult === TRating.POSITIVE ? "scale-125" : "hover:scale-110", "text-green-500 bg-green-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full hover:cursor-pointer  transition-all")}/>
                        </CardHeader>
                        <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                            {positive}
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                    <CardContent className="p-[1vh] px-[2vh]">
                        <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                            <CardTitle className="text-md">
                                Neutral
                            </CardTitle>
                            <Meh onClick={() => setFocusedResult(focusedResult === TRating.NEUTRAL ? null : TRating.NEUTRAL)} className={cn(focusedResult === TRating.NEUTRAL ? "scale-125" : "hover:scale-110", "text-blue-500 bg-blue-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full hover:cursor-pointer transition-all")}/>
                        </CardHeader>
                        <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                            {neutral}
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/70 dark:bg-slate-900/70">
                    <CardContent className="p-[1vh] px-[2vh]">
                        <CardHeader className="p-0 flex flex-row justify-between items-center h-full">
                            <CardTitle className="text-md">
                                Negative
                            </CardTitle>
                            <Frown onClick={() => setFocusedResult(focusedResult === TRating.NEGATIVE ? null : TRating.NEGATIVE)} className={cn(focusedResult === TRating.NEGATIVE ? "scale-125" : "hover:scale-110", "text-red-500 bg-red-400/10 rounded-lg p-[0.7vh] h-full max-h-[4vh] max-w-[4vh] w-full hover:cursor-pointer transition-all")}/>
                        </CardHeader>
                        <CardDescription className="pb-[1vh] text-slate-400 dark:text-slate-400">
                            {negative}
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-[2vh] h-[43vh] bg-slate-900 rounded-lg border border-slate-700">
                <ScrollArea className="px-[2vh]">
                    {notes.map((note, i) => ( note.rating === focusedResult || focusedResult === null) && (
                        <NoteCard key={i} note={note}/>
                    ))}
                </ScrollArea>
            </div>
        </>
    )
}

export default StaffNotes