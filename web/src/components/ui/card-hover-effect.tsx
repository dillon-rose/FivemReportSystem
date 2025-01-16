import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "./Card";

export const HoverEffect = <T,>({
  items,
  onClick,
  mapFunc,
  className,
}: {
  items: T[];
  onClick: (item: T) => void;
  mapFunc: (item: T) => JSX.Element
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div
      className={cn(
        "grid grid-cols-4 px-[0.3vw] py-[1.2vh] rounded-lg",
        className
      )}
    >
        {items.map((item, idx) => (
            <div
                className="relative group p-[0.9vh] min-h-[7.4vh] w-full"
                onClick={() => onClick(item)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <AnimatePresence>
                    {hoveredIndex === idx && (
                        <motion.span
                        className="absolute inset-0 w-full bg-neutral-200 dark:bg-slate-700/60 block rounded-lg"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: { duration: 0.15 },
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.15, delay: 0.2 },
                        }}
                        />
                    )}
                </AnimatePresence>
                {mapFunc(item)}
            </div>   
        ))}
    </div>
  );
};