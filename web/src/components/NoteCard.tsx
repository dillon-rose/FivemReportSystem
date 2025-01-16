import { Card, CardContent, CardDescription, CardTitle } from './ui/Card'
import { Note, TRating } from '@/types/types'
import { Smile, Frown, Meh } from 'lucide-react'
import { formatDistanceToNow, formatRelative, subDays } from 'date-fns'
import ReportPreviewButton from './ReportPreviewButton'

type Props = {
    note: Note,
}

const NoteCard = ({ note }: Props) => {
    const rating = note.rating === TRating.POSITIVE ? 
        <Smile size={"5vh"} className="text-green-500 bg-green-400/10 rounded-lg p-[0.7vh]"/> : 
    (note.rating === TRating.NEGATIVE ? 
        <Frown size={"5vh"} className="text-red-500 bg-red-400/10 rounded-lg p-[0.7vh]"/> :
        <Meh size={"5vh"} className="text-blue-500 bg-blue-400/10 rounded-lg p-[0.7vh]"/>)

        return (
        <Card className="w-full my-[1.5vh]">
            <CardContent className="p-[1vh] px-[2vh]">
                <CardTitle className="text-md flex gap-[1vh] w-full items-center break-all">
                        <div className="grid grid-cols-[80%_20%] w-full">
                            <div className="flex items-center gap-[1vh] break-all">
                                <div className='flex gap-[1vh] items-center'>
                                    {rating}
                                </div>
                                {note.description}
                            </div>
                            <div
                            className={"ml-auto text-sm font-normal text-slate-400"}
                            >
                                {formatRelative(new Date(note.time), Date.now())}
                            </div>
                        </div>
                </CardTitle>
                <div className="flex gap-2 justify-between">
                    <CardDescription className="p-[1vh] text-slate-400 dark:text-slate-400">
                        Creator: {note.creator.name}
                    </CardDescription>
                    {note.report && (
                        <ReportPreviewButton report={note.report}/>
                    )}
                </div>
            </CardContent>
            
        </Card>
    )
}

export default NoteCard