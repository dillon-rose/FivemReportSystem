import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Permission, Response, Staff } from "@/types/types"
import { Card, CardContent, CardHeader } from "./ui/Card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { StateContext } from "@/providers/ContextProvider"
import { useContext } from "react"

type props = {
    primaryStaff?: Response,
    attatchedStaff: Response[],
    classname?: string,
}

const AttatchedStaffDisplay = ({ primaryStaff, attatchedStaff, classname }: props) => {
    const context = useContext(StateContext);

    return (
        <Card className={`${classname}`}>
            <CardHeader className="font-semibold text-md py-[2vh]">Attatched Staff:</CardHeader>
            <Separator />
            <CardContent className="py-[1vh]">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-slate-800 dark:hover:bg-slate-900">
                            <TableHead className="w-[30%] text-center">Name</TableHead>
                            <TableHead className="text-center">Rank</TableHead>
                            <TableHead className="text-center">Responded At</TableHead>
                            <TableHead className="w-[5%]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            primaryStaff && (
                                <TableRow key={primaryStaff.staff.discordId}>
                                    <TableCell>{primaryStaff.staff.name}</TableCell>
                                    <TableCell className="text-center">{primaryStaff.staff.rank}</TableCell>
                                    <TableCell className="text-center">{new Date(primaryStaff.time).toLocaleString("en-US", { timeZone: "America/New_York" })} EDT</TableCell>
                                    <TableCell className="font-medium">
                                        <Badge variant="solved">Primary</Badge>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {
                             attatchedStaff.filter(response => context.permission <= Permission.MODERATOR || response.staff.discordId === context.myDiscordId)
                             .map((response) => (
                                <TableRow key={response.staff.discordId}>
                                    <TableCell>{response.staff.name}</TableCell>
                                    <TableCell className="text-center">{response.staff.rank}</TableCell>
                                    <TableCell className="text-center">{new Date(response.time).toLocaleString("en-US", { timeZone: "America/New_York" })} EDT</TableCell>
                                    <TableCell className="font-medium">
                                        <Badge variant="kick">Attatched</Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AttatchedStaffDisplay