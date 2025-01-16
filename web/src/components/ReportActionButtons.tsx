import { GameReport, Permission, Results, Statuses } from "@/types/types"
import { Button } from "./ui/button"
import { StateContext } from "@/providers/ContextProvider"
import { respondToReport, solveReport, transferReport } from "@/utils/reportChange"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { useContext, useState } from "react"

type props = {
    report: GameReport
}

const ReportActionButtons = ({ report }: props) => {
    const context = useContext(StateContext);
    const [transferTarget, setTransferTarget] = useState<string | undefined>(report.primaryStaff?.staff.discordId);
    const [reportResult, setReportResult] = useState<Results>(Results.NOTHING);
    const isAttatched = (report.attatchedStaff.find(response => response.staff.discordId === context.myDiscordId) || report.primaryStaff?.staff.discordId === context.myDiscordId) && report.primaryStaff;

    return (
        <div className="flex gap-2">
            {((context.myDiscordId && report.primaryStaff?.staff.discordId === context.myDiscordId) || context.permission <= Permission.MODERATOR) && isAttatched && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button size="sm" disabled={report.status === Statuses.SOLVED} variant="warning" onClick={() => {}}>Transfer</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[25vw]">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="text-lg leading-none">Transfer Report</h4>
                                <p className="text-sm text-muted-foreground">
                                    Change who the primary staff is.
                                </p>
                            </div>
                            <div className="flex items-center gap-[2vh]">
                                <Label htmlFor="width">New Primary:</Label>
                                <Select onValueChange={(val) => {setTransferTarget(val)}}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={report.attatchedStaff.find(response => response.staff.discordId === transferTarget)?.staff.name || "None"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Attatched Staff</SelectLabel>
                                            {report.attatchedStaff.map((response) => (
                                                <SelectItem className="my-[0.5vh]" key={response.staff.discordId} value={response.staff.discordId.toString()}>{response.staff.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="w-fit" size="sm" variant="warning" onClick={() => transferReport(report.reportNumber, transferTarget)}>Confirm Transfer</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
            {(( context.myDiscordId && report.primaryStaff?.staff.discordId === context.myDiscordId) || context.permission <= Permission.MODERATOR) && isAttatched && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button size="sm" disabled={report.status === Statuses.SOLVED} variant="green">Solve</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[25vw]">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="text-lg leading-none">Solve Report</h4>
                                <p className="text-sm text-muted-foreground">
                                    Select the result of the report.
                                </p>
                            </div>
                            <div className="flex items-center gap-[2vh]">
                                <Label htmlFor="width">Result:</Label>
                                <Select onValueChange={(val) => {setReportResult(val as Results)}}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={reportResult} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Results</SelectLabel>
                                            {Object.values(Results).map((result) => (
                                                <SelectItem className="my-[0.5vh]" key={result} value={result}>{result}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="w-fit" size="sm" variant="green" onClick={() => solveReport(report.reportNumber, reportResult)}>Solve</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
            <Button size="sm" disabled={context.permission !== Permission.ADMIN && report.status === Statuses.SOLVED} variant="blue" onClick={() => respondToReport(report.reportNumber)}>Respond</Button>
        </div>
    )
}

export default ReportActionButtons