import { Separator } from "@/components/ui/separator"
import { Link, useLocation } from "react-router-dom"
import { buttonVariants } from "./ui/button"
import { BarChart4, File, Flag, LogOut, RefreshCcw, Users } from "lucide-react"
import { cn } from "@/utils/cn"
import { LucideIcon } from "lucide-react"
import { StateContext } from '../providers/ContextProvider';
import { useMemo, useContext } from "react"
import { Permission } from "@/types/types"
import { useVisibility } from "@/providers/VisibilityProvider"

type NavBarItem = {
    title: string,
    icon: LucideIcon,
    variant: "default" | "ghost",
    to: string,
    permission?: Permission
}

type NavBarItems = (NavBarItem | undefined)[][]

const Navbar = () => {
  const context = useContext(StateContext);
  const location = useLocation();
  const visibility = useVisibility();

  const isActiveReport = context.activeReport !== null;

  const  items: NavBarItems = useMemo((): NavBarItems => {
    return [
      [
        {
          title: "Report List",
          variant: "default",
          icon: Flag,
          to: "/reports"
        },
        {
          title: "Player List",
          variant: "default",
          icon: Users,
          to: "/players"
        },
        isActiveReport ? {
          title: "Active Report",
          variant: "default",
          icon: RefreshCcw,
          to: "/reports/" + context.activeReport
        } : undefined
      ],
      [
        {
          title: "Statistics",
          variant: "default",
          icon: BarChart4,
          to: "/stats",
          permission: Permission.ADMIN
        },
      ],
    ]
  }, [context.permission, isActiveReport]);

  return (
    <div className="bg-slate-900/70 rounded-s-lg h-[74.9vh] border-r-slate-700 border-r">
      <div className="flex flex-col items-center w-full h-full">
        <div className="mx-[0.2vh] h-[12vh] flex items-center">
          <h1 className="font-sans font-bold text-[4vh] text-center">Reports</h1>
        </div>
        <Separator />
        <div
          className="group w-full h-full flex flex-col my-2 justify-between"
        >
          <nav className="flex flex-col gap-2 h-[90%]">
            {items.map((value, index) => {
              return <div key={`nav-item-${index}`} className="w-full px-[1vh]">
                {
                  value.map((item, i) => {
                    if (item && item.permission !== undefined && item.permission !== context.permission) return null;
                    
                    return item && (
                      <Link
                        key={`nav-item-${index}-${i}`}
                        to={item.to}
                        className={cn(
                          buttonVariants({ variant: item.variant, size: "sm" }),
                          ((location.pathname === item.to) ? 
                            ("dark:bg-slate-700 dark:hover:bg-slate dark:text-white dark:hover:text-white")
                            :
                            ("dark:bg-transparent dark:text-white dark:hover:bg-slate-800 dark:hover:text-white")),
                          "justify-start text-[2vh] font-medium h-[7vh] mt-[1vh] w-full"
                        )}
                      >
                        <item.icon className="mr-[1vw] h-full w-[1.3vw]" />
                        {item.title}
                      </Link>
                    )
                  })
                }

                {index === items.length - 1 || <Separator className="mt-[1vh]"/>}
              </div>
            })}
            
          </nav>
          <nav className="flex flex-col gap-2 h-[10%] px-[1vh]">
            <div
              key="nav-item-logout"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                ("dark:bg-transparent dark:text-white dark:hover:bg-slate-800 dark:hover:text-white"),
                "justify-start text-[2vh] font-medium h-[7vh] mt-[1vh] cursor-pointer"
              )}
              onClick={() => visibility.setVisible(false)}
            >
              <LogOut className="mr-[1vw] h-full w-[1.3vw]"/>
              Close
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar