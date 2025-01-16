import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons"
  import { Table } from "@tanstack/react-table"
  
  import { Button } from "@/components/ui/button"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  interface DataTablePaginationProps<TData> {
    table: Table<TData>
  }
  
  export function DataTablePagination<TData>({
    table,
  }: DataTablePaginationProps<TData>) {
    return (
      <div className="flex items-center justify-between px-[0.5vw] py-[1vh]">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getState().pagination.pageSize} of{" "}
          {table.getFilteredRowModel().rows.length} row(s).
        </div>
        <div className="flex items-center space-x-[1.8vw] lg:space-x-[2.2vw]">
          <div className="flex items-center space-x-[0.4vw]">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-[4vh] w-[5vw] bg-slate-800 dark:bg-slate-800 border dark:border-slate-600">
                <SelectValue placeholder={table.getState().pagination.pageSize} className="bg-slate-800 dark:bg-slate-800 border"/>
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[5vw] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-[0.4vw]">
            <Button
              variant="outline"
              className="hidden h-[4vh] w-[2vw] p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-[2vh] w-[2vh]" />
            </Button>
            <Button
              variant="outline"
              className="h-[4vh] w-[2vw] p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-[2vh] w-[2vh]" />
            </Button>
            <Button
              variant="outline"
              className="h-[4vh] w-[2vw] p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-[2vh] w-[2vh]" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-[4vh] w-[2vw] p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-[2vh] w-[2vh]" />
            </Button>
          </div>
        </div>
      </div>
    )
  }