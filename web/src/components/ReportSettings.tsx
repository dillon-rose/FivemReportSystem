import { Settings } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Results, Statuses } from "@/types/types"
import { updateReportResult, updateReportStatus } from "@/utils/reportChange"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type props = {
    reportNumber: number,
    status: Statuses,
    result?: Results,
}

const ReportSettings = ({ reportNumber, status, result }: props) => {
    const [statusValue, setStatusValue] = useState<Statuses>(status);
    const [resultValue, setResultValue] = useState<Results | undefined>(result);

    useEffect(() => {
        setResultValue(result);
    }, [result]);

    const onSettingsConfirm = () => {
        if (status !== statusValue) {
            if (statusValue === Statuses.SOLVED && !resultValue) {
                toast.error("Please select a result for the report to be marked as solved.");
                return;
            }

            updateReportStatus(reportNumber, statusValue);

            if (statusValue !== Statuses.SOLVED) {
                updateReportResult(reportNumber, undefined);
            }
        }

        if (resultValue !== undefined && result !== resultValue) {
            updateReportResult(reportNumber, resultValue);
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
            <Settings className="h-[5vh] w-[5vh] p-[0.7vh] border border-blue-500 text-blue-500 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg  hover:cursor-pointer"/>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                    <h4 className="font-medium leading-none">Report Settings</h4>
                    <p className="text-sm text-muted-foreground">
                        Change the state of the report.
                    </p>
                    </div>
                    <div className="grid gap-[1vh]">
                        <div className="flex items-center gap-[2vh]">
                            <Label htmlFor="width">Status:</Label>
                            <Select onValueChange={(val) => {setStatusValue(val as Statuses)}}>
                                <SelectTrigger>
                                    <SelectValue placeholder={statusValue[0].toUpperCase() + statusValue.substring(1).toLowerCase()} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Statuses</SelectLabel>
                                        {([Statuses.SOLVED, Statuses.SOLVING]).map((result) => (
                                            <SelectItem className="my-[0.5vh]" key={result} value={result}>{result[0].toUpperCase() + result.substring(1).toLowerCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {
                            statusValue === Statuses.SOLVED && (
                                <div className="flex items-center gap-[2vh]">
                                    <Label htmlFor="width">Result:</Label>
                                    <Select onValueChange={(val) => {setResultValue(val as Results)}}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={resultValue ? resultValue[0].toUpperCase() + resultValue.substring(1).toLowerCase() : "None"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectLabel>Results</SelectLabel>
                                            {(Object.values(Results)).map((result) => (
                                                <SelectItem key={result} value={result}>{result[0].toUpperCase() + result.substring(1).toLowerCase()}</SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    <Button className="w-fit" size="sm" variant="blue" onClick={() => onSettingsConfirm()}>Confirm</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ReportSettings
