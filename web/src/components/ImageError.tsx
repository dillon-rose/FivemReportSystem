import { ImageOff } from 'lucide-react'
import React from 'react'

const ImageError = ({ classname }: { classname?: string }) => {
  return (
    <div className={`flex items-center ${classname}`}>
      <div className={`h-[90%] w-[90%] flex items-center justify-center m-[1vh] py-[10vh] rounded-lg bg-slate-700 border border-slate-900`}>
          <ImageOff className='p-0'/>
      </div>
    </div>
  )
}

export default ImageError