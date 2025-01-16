import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  FilterFnOption,
  FilterMeta,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./button"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { useEffect, useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  onSelect?: (data: TData) => void,
  filterColumn?: string,
  searchColumns?: string[],
  fullyHiddenCols?: string[],
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSelect,
  filterColumn,
  searchColumns = [],
  fullyHiddenCols = [],
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  }); 

  const searchFilter = (row: Row<TData>, columnId: string, filterValue: string, addMeta: (meta: FilterMeta) => void) => {
    const cellValue = String(row.getValue(columnId));
    const searchValue = filterValue;

    return String(cellValue).toLowerCase().includes(searchValue.toLowerCase());
  }
  
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination
    },
    globalFilterFn: searchFilter,
    getColumnCanGlobalFilter: (column) => searchColumns.includes(column.id),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} filterColumn={filterColumn} searchColumns={searchColumns.length > 0} fullyHiddenCols={fullyHiddenCols}/>
      <div className="rounded-md border border-slate-500">
      <Table>
          <TableHeader className="bg-slate-900/70">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className={`${index == 0 && "rounded-tl-lg"} ${index == headerGroup.headers.length - 1 && "rounded-tr-lg"}`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onSelect ? onSelect(row.original) : null}
                  className={`${onSelect && "cursor-pointer"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table}/>
    </div>
  )
}
