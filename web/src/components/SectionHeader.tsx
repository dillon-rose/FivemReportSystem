import React from 'react'
import { Separator } from './ui/separator'

const SectionHeader = ({ children, classname }: { children: React.ReactNode, classname?: string }) => {
  return (
    <>
        <div className={`h-[10vh] mx-[1.5vw] flex items-center ${classname}`}>
            {children}
        </div>
        <Separator />
    </>
    
  )
}

export default SectionHeader