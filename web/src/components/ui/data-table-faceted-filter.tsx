import * as React from "react"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/utils/cn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "./scroll-area"
import { Results, Statuses } from "@/types/types"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: Statuses | Results
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-[5vh] border-dashed dark:border-slate-600">
          <PlusCircledIcon className="mr-[0.8vw] h-[3vh] w-[1.5vw]" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-[0.8vw] h-[2vh]" />
              <Badge
                variant="secondary"
                className="rounded-lg px-[0.8vw] font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-[0.8vw] lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-lg px-[0.8vw] font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => {
                        return (
                      <Badge
                        variant={option.value}
                        key={option.value}
                        className="rounded-lg px-[0.8vw] font-normal"
                      >
                        {option.label}
                      </Badge>
                    )})
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12vw] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className="flex w-full">
            <ScrollArea className="h-full w-[12vw]">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                {options.map((option) => {
                    const isSelected = selectedValues.has(option.value)
                    return (
                    <CommandItem
                        key={option.value}
                        className="w-full"
                        onSelect={() => {
                        if (isSelected) {
                            selectedValues.delete(option.value)
                        } else {
                            selectedValues.add(option.value)
                        }
                        const filterValues = Array.from(selectedValues)
                        column?.setFilterValue(
                            filterValues.length ? filterValues : undefined
                        )
                        }}
                    >
                        <div
                        className={cn(
                            "mr-[0.8vw] flex h-[3vh] w-[3vh] items-center justify-center rounded-sm border border-primary",
                            isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                        >
                        <CheckIcon className={cn("h-[3vh] w-[2vw]")} />
                        </div>
                        {option.icon && (
                        <option.icon className="mr-2 h-[3vh] w-[2vw] text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                    </CommandItem>
                    )
                })}
                </CommandGroup>
                {selectedValues.size > 0 && (
                <>
                    <CommandSeparator />
                    <CommandGroup>
                    <CommandItem
                        onSelect={() => column?.setFilterValue(undefined)}
                        className="justify-center text-center"
                    >
                        Clear filters
                    </CommandItem>
                    </CommandGroup>
                </>
                )}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}