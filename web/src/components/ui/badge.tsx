import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/cn"

const variants = {
  variant: {
    default:
      "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    solved:
      cn("border-transparent",
        "bg-green-600/30 text-green-400 hover:bg-green-600/20", 
        "dark:bg-green-600/30 dark:text-green-500 dark:hover:bg-green-600/20"),
    unsolved: cn("border-transparent",
      "bg-rose-600/30 text-rose-400 hover:bg-rose-400/20", 
      "dark:bg-rose-600/30 dark:text-rose-400 dark:hover:bg-rose-600/20"),
    solving: cn("border-transparent",
      "bg-yellow-400/30 text-yellow-400 hover:bg-yellow-400/20", 
      "dark:bg-yellow-400/30 dark:text-yellow-400 dark:hover:bg-yellow-400/20"),
    ban: cn("border-transparent",
      "bg-red-600/30 text-red-500 hover:bg-red-600/20", 
      "dark:bg-red-600/30 dark:text-red-500 dark:hover:bg-red-600/20"),
    kick: cn("border-transparent",
      "bg-orange-500/30 text-orange-400 hover:bg-orange-500/20", 
      "dark:bg-orange-500/30 dark:text-orange-400 dark:hover:bg-orange-500/20"),
    warn: cn("border-transparent",
      "bg-amber-600/30 text-amber-300 hover:bg-amber-600/20", 
      "dark:bg-amber-600/30 dark:text-amber-300 dark:hover:bg-amber-600/20"),
    verbal: cn("border-transparent",
      "bg-sky-400/30 text-sky-400 hover:bg-sky-400/20", 
      "dark:bg-sky-600/30 dark:text-sky-400/90 dark:hover:bg-sky-600/20"),
    nothing: cn("border-transparent",
      "bg-green-500/30 text-green-400 hover:bg-green-500/20", 
      "dark:bg-green-500/30 dark:text-green-400 dark:hover:bg-green-500/20"),
    other: cn("border-transparent",
      "bg-purple-500/30 text-purple-400/90 hover:bg-purple-500/20", 
      "dark:bg-purple-500/30 dark:text-purple-400/90 dark:hover:bg-purple-500/20"),
  },
} as const;

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border border-slate-700 px-[0.5vw] py-[0.3vh] text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: variants,
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export type TBadgeVariants = keyof typeof variants.variant;

export { Badge, badgeVariants }
