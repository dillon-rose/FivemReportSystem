import { TRating } from '@/types/types'
import { cn } from '@/utils/cn'
import { Frown, Meh, Smile } from 'lucide-react'
import { useState } from 'react'

type props = {
    rating: TRating,
    setRating: React.Dispatch<React.SetStateAction<TRating>>
}
const Rating = ({ rating: curRating, setRating }: props) => {
    return (
        <div className='flex gap-[1vh]'>
            <Smile size={"4vh"} className={cn("hover:text-green-400/75 hover:cursor-pointer", `${curRating === TRating.POSITIVE ? 'text-green-400' : 'text-slate-600'}`)}
            onClick={() => setRating(TRating.POSITIVE)}/>
            <Meh size={"4vh"} className={cn("hover:text-blue-400/75 hover:cursor-pointer", `${curRating === TRating.NEUTRAL ? 'text-blue-400' : 'text-slate-600'}`)}
            onClick={() => setRating(TRating.NEUTRAL)}/>
            <Frown size={"4vh"} className={cn("hover:text-red-400/75 hover:cursor-pointer", `${curRating === TRating.NEGATIVE ? 'text-red-400' : 'text-slate-600'}`)}
            onClick={() => setRating(TRating.NEGATIVE)}/>
        </div>
    )
}

export default Rating