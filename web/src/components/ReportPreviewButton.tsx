import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { TReport } from '@/types/types'

type props = {
    report: TReport
}

const ReportPreviewButton = ({ report }: props) => {
  return (
    <AlertDialog>
        <AlertDialogTrigger>
            <Button size="sm" variant="outline">View Report</Button>
        </AlertDialogTrigger>
        <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogContent className='max-h-[80vh]'>
                <ScrollArea className='h-full'>
                    <div className='max-h-[76vh] flex flex-col justify-between gap-[2vh]'>
                        <div className='py-[2vh]'>
                            <AlertDialogHeader className='flex flex-col'>
                                <AlertDialogTitle>Report</AlertDialogTitle>
                                <AlertDialogDescription>This is the report that the note was added to</AlertDialogDescription>
                                <div className='flex gap-[1vh]'>
                                    <Badge key="status" variant={report.status}>
                                        {report.status}
                                    </Badge>
                                    {
                                        report.result && (
                                            <Badge key="result" variant={report.result}>
                                                {report.result}
                                            </Badge>
                                        )
                                    }
                                </div>
                            </AlertDialogHeader>
                            <fieldset>
                                <Label className='text-md'>Description</Label>
                                <p className='text-slate-400 break-all text-sm'>{report.description}</p>
                            </fieldset>
                            <fieldset>
                                <Label className='text-md'>Creator</Label>
                                <p className='text-slate-400 text-sm'>{report.creator.name} ({report.creator.steam})</p>
                            </fieldset>
                            {
                                report.offender && (
                                    <fieldset>
                                        <Label className='text-md'>Offender</Label>
                                        <p className='text-slate-400 text-sm'>{report.offender.name} ({report.offender.steam})</p>
                                    </fieldset>
                                )
                            }
                            <fieldset>
                                <Label className='text-md'>Reported At</Label>
                                <p className='text-slate-400 text-sm'>{new Date(report.createdAt).toLocaleString("en-US", { timeZone: "America/New_York" })} EDT</p>
                            </fieldset>
                            <fieldset>
                                <Label className='text-md'>Solved By</Label>
                                <p className='text-slate-400 text-sm'>{report.solvedBy?.name || "No One"}</p>
                            </fieldset>
                            <fieldset>
                                <Label className='text-md'>Primary Staff</Label>
                                <p className='text-slate-400 text-sm'>{report.primaryStaff?.staff.name}</p>
                            </fieldset>
                            <fieldset>
                                <Label className='text-md'>Attatched Staff</Label>
                                {
                                    report.attatchedStaff.map((staff) => (
                                        <p key={staff.staff.discordId} className='text-slate-400 text-sm'>- {staff.staff.name}</p>
                                    ))
                                }
                            </fieldset>
                        </div>
                        <div>
                            <AlertDialogCancel className='flex items-center justify-start'>
                                <Button size="sm" variant="outline" className="text-slate-300">Close</Button>
                            </AlertDialogCancel>
                        </div>
                    </div>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialogPortal>
    </AlertDialog>
  )
}

export default ReportPreviewButton