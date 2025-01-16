import { ChatBubbleIcon, CheckCircledIcon, CircleBackslashIcon, Cross2Icon, ExclamationTriangleIcon, LockClosedIcon, MagnifyingGlassIcon, QuestionMarkCircledIcon, TimerIcon, TrashIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "./data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Results, Statuses } from "@/types/types"
import { Input } from "./input"
import { useState } from "react"

const resultsAndStatuses = [
    {
      label: "Ban",
      value: Results.BAN,
      icon: LockClosedIcon,
    },
    {
        label: "Kick",
        value: Results.KICK,
        icon: TrashIcon,
    },
    {
        label: "Warn",
        value: Results.WARN,
        icon: ExclamationTriangleIcon,
    },
    {
        label: "Verbal",
        value: Results.VERBAL,
        icon: ChatBubbleIcon,
    },
    {
        label: "Other",
        value: Results.OTHER,
        icon: QuestionMarkCircledIcon,
    },
    {
        label: "Nothing",
        value: Results.NOTHING,
        icon: CircleBackslashIcon,
    },
    {
        label: "Solving",
        value: Statuses.SOLVING,
        icon: TimerIcon,
    },
    {
        label: "Unsolved",
        value: Statuses.UNSOLVED,
        icon: MagnifyingGlassIcon,
    },
  ]

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  filterColumn?: string,
  searchColumns?: boolean,
  fullyHiddenCols?: string[],
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
  searchColumns = false,
  fullyHiddenCols = [],
}: DataTableToolbarProps<TData>) {
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-[0.4vw]">
        {
        searchColumns && (
          <Input
            placeholder="Search..."
            value={searchBarValue}
            onChange={(event) => {
              setSearchBarValue(event.target.value);
              table.setGlobalFilter(event.target.value.toLowerCase());
            }
              
            }
            className="max-w-sm"
          />
        )}
        {
        filterColumn && (
          <DataTableFacetedFilter
            column={table.getColumn(filterColumn)}
            title="Result/Status"
            options={resultsAndStatuses}
          />
        )}
        {(isFiltered || searchBarValue.length > 0) && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setSearchBarValue("");
              table.setGlobalFilter("");
            }}
            className="h-[3vh] px-[0.4vw] lg:px-[0.6vw]"
          >
            Reset
            <Cross2Icon className="ml-[0.4vw] h-[1.5vh] w-[1.5vh]" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} blacklist={fullyHiddenCols}/>
    </div>
  )
}