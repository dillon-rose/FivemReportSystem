import ImageError from "./ImageError"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

type props = {
    screenshot: string | null,
    classname?: string,
}

const Screenshot = ({ screenshot, classname }: props) => {
  return (
    screenshot ? (
        <div className="flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <img src={screenshot} className={`w-[90%] h-[90%] rounded-lg mt-[1vh] border border-slate-900 hover:scale-[1.01] transition-all hover:cursor-pointer ${classname}`}/>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-[1vh]">
                <img src={screenshot} className="w-[50vw] h-[50vh] rounded-lg "/>
                <div className="flex justify-end">
                  <AlertDialogCancel className="w-[12%] bg-slate-700 text-slate-200 hover:bg-slate-600">Close</AlertDialogCancel>
                </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <ImageError classname={classname}/>
      )
  )
}

export default Screenshot