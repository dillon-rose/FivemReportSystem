import { MessageCirclePlus } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useRef, useState } from "react"
import { Response, Staff, TRating } from "@/types/types"
import { Textarea } from "./ui/textarea"
import Rating from "./ui/rating"
import { Button } from "./ui/button"
import { toast } from "sonner"

type props = {
    onSubmit: (staff: Staff, rating: TRating, note: string) => void
    staffMembers?: Response[],
    staffMember?: Staff,
}

const StaffNote = ({ staffMembers, staffMember, onSubmit: submitCb }: props) => {
    const [staff, setStaff] = useState<string | undefined>(staffMember?.discordId);
    const [staffRating, setStaffRating] = useState<TRating>(TRating.NEUTRAL);
    const noteRef = useRef<HTMLTextAreaElement>(null);

    function onSubmit() {
        if (!staff) {
            toast.error("Please select a staff member");
            return;
        }

        if (!noteRef.current || noteRef.current.value.length === 0) {
            toast.error("Please add a note to the text field");
            return;
        }

        const staffObj = staffMember || (staffMembers ? staffMembers.find(s => s.staff.discordId == staff)?.staff : undefined);

        if (!staffObj) {
            toast.error("Staff member not found");
            return;
        }

        submitCb(staffObj, staffRating, noteRef.current.value);
        toast.success("Adding New Note");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <MessageCirclePlus className="h-[5vh] w-[5vh] p-[0.7vh] border border-green-500 text-green-500 bg-green-500/20 hover:bg-green-500/40 rounded-lg  hover:cursor-pointer"/>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent className="text-slate-300">
                    <DialogTitle>Add Note</DialogTitle>
                    {staffMembers && <DialogDescription>Add a note to this report about a staff member</DialogDescription>}
                    {staffMember && <DialogDescription>Add a note to {staffMember.name}'s profile</DialogDescription>}
                    <DialogHeader>
                        <Label className="text-sm">Rating</Label>
                        <DialogDescription>Indicates the nature of the note (good, neutral, or bad)</DialogDescription>
                        <Rating rating={staffRating} setRating={setStaffRating}/>
                    </DialogHeader>
                    {
                        staffMembers && 
                            <fieldset className="flex flex-col gap-[1vh] mb-[1vh]">
                                <Label className="text-sm">Staff Member</Label>
                                <Select onValueChange={(val) => {setStaff(val)}}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={(staff && staffMembers.find(s => s.staff.discordId == staff)?.staff.name) || "None"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Staff On Scene</SelectLabel>
                                            {staffMembers.map((staffMember) => (
                                                <SelectItem className="my-[0.5vh]" key={staffMember.staff.discordId} value={staffMember.staff.discordId.toString()}>{staffMember.staff.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </fieldset>
                        }
                    <fieldset className="flex flex-col gap-[1vh]">
                        <Label className="text-sm mb-0">Note</Label>
                        <Textarea placeholder="Type your note here." ref={noteRef}/>
                    </fieldset>
                    <div className="flex gap-[2vh]">
                        <DialogClose>
                            <Button className="w-fit" size="sm" variant="green" onClick={onSubmit}>Confirm</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button className="w-fit" size="sm" variant="destructive">Close</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

export default StaffNote