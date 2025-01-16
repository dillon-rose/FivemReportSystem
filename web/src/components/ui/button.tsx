import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/cn"

const buttonTypes = {
  default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
  destructive: cn("border border-red-500",
  "bg-red-600/30 text-red-400 hover:bg-red-600/20", 
  "dark:bg-red-600/30 dark:text-red-500 dark:hover:bg-red-600/20"),
  outline:
    "border border-slate-700 bg-transparent hover:bg-slate-700 hover:text-slate-50 dark:border-slate-700 dark:bg-transparent dark:hover:bg-slate-700 dark:hover:text-slate-50",
  secondary:
    "bg-slate-700/70 text-slate-200 hover:bg-slate-700/40 bg-slate-700/70 dark:text-slate-200 dark:hover:bg-slate-700/40",
  ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
  link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
  green: cn("border border-green-500",
  "bg-green-600/20 text-green-400 hover:bg-green-600/30", 
  "dark:bg-green-600/30 dark:text-green-500 dark:hover:bg-green-600/20"),
  warning: cn("border border-orange-400",
  "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30", 
  "dark:bg-orange-500/30 dark:text-orange-400 dark:hover:bg-orange-500/20"),
  blue: cn("border border-blue-500",
  "bg-blue-500/20 text-blue-500 hover:bg-blue-400/20", 
  "dark:bg-blue-600/30 dark:text-blue-400/90 dark:hover:bg-blue-600/20"),
} as const

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: buttonTypes,
      size: {
        default: "h-[5vh] px-[1vw] py-[1vh]",
        sm: "h-[4vh] rounded-md px-[0.8vw] py-[1vh]",
        lg: "h-[6vh] rounded-md px-[1.5vw]",
        icon: "h-[7vh] w-[7vh]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export type ButtonTypes = keyof typeof buttonTypes;

export { Button, buttonVariants }
