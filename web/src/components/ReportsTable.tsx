import { Player, Results, Statuses, TReport } from "@/types/types"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { DataTable } from "./ui/data-table"
import { Badge } from "./ui/badge"
import { DataTableColumnHeader } from "./ui/data-table-culumn-header"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

 
export const createdColumns: ColumnDef<TReport>[] = [
  {
    id: "Name",
    accessorKey: "offender.name",
    header: ({ column }) => (
      <DataTableColumnHeader className="justify-center" column={column} title="Offender" />
    ),
    cell({ getValue }) {
      const offender: string | undefined = getValue() as string | undefined;

      return offender ? <div className="break-all">{offender}</div> : "None";
    }
  },
  {
    id: "Description",
    accessorKey: "description",
    cell({ getValue }) {
      const description: string | undefined = getValue() as string | undefined;

      return <div className="break-all">{description}</div>;
    },
    header: ({ column }) => (
      <DataTableColumnHeader className="justify-center" column={column} title="Description" />
    ),
  },
  {
    id: "Time Created",
    accessorKey: "createdAt",
    cell: ({ getValue }) => {
        const date: number = getValue() as number;
        
        return new Date(date).toLocaleString("en-US", { timeZone: "America/New_York" }) + " EDT"
      },
      header: ({ column }) => (
        <DataTableColumnHeader className="justify-center" column={column} title="Date" />
      ),
  },
  {
    id: "Result/Status",
    accessorKey: "result",
    header: ({ column }) => (
      <DataTableColumnHeader className="justify-center" column={column} title="Result/Status" />
    ),
    cell({ row }) {
        const result: Results | undefined = row.original.result;
        const status: Statuses = row.original.status;

        return result ? <Badge variant={result}>{result}</Badge> : <Badge variant={status}>{status}</Badge>;
    },
    filterFn: (row, id, value) => {
      return row.original.result ? value.includes(row.original.result) : value.includes(row.original.status)
    },
  },
]

export const offenderColumns: ColumnDef<TReport>[] = [
  {

    id: "Name",
    accessorKey: "creator.name",
    cell({ getValue }) {
      const creator: string | undefined = getValue() as string | undefined;

      return creator ? <div className="break-all">{creator}</div> : "None";
    },
    header: ({ column }) => (
      <DataTableColumnHeader className="justify-center" column={column} title="Creator" />
    )
  },
  {
    id: "Description",
    accessorKey: "description",
    cell({ getValue }) {
      const description: string | undefined = getValue() as string | undefined;

      return <div className="break-all">{description}</div>;
    },
    header: ({ column }) => (
      <DataTableColumnHeader className="justify-center" column={column} title="Description" />
    ),
  },
  {
    id: "Time Created",
    accessorKey: "createdAt",
    cell: ({ getValue }) => {
        const date: number = getValue() as number;
        
        return new Date(date).toLocaleString("en-US", { timeZone: "America/New_York" }) + " EDT"
      },
      header: ({ column }) => (
        <DataTableColumnHeader className="justify-center" column={column} title="Date" />
      ),
  },
  {
    id: "Result/Status",
    accessorKey: "result",
    header: ({ column }) => (
      <DataTableColumnHeader className="justify-center" column={column} title="Result/Status" />
    ),
    cell({ row }) {
        const result: Results | undefined = row.original.result;
        const status: Statuses = row.original.status;

        return result ? <Badge variant={result}>{result}</Badge> : <Badge variant={status}>{status}</Badge>;
    },
    filterFn: (row, id, value) => {
      return row.original.result ? value.includes(row.original.result) : value.includes(row.original.status)
    },
  },
]

type props = {
  data: TReport[],
  playerHex: string,
  creator?: boolean,
  classname?: string,
}

const ReportsCreatedTable = ({ data, playerHex, creator, classname }: props) => {
  return (
    <div className={`container mx-auto pt-[2vh] ${classname}`}>
      {
        creator ? (
          <DataTable columns={createdColumns} data={data.filter(report => report.creator.steam === playerHex)} filterColumn="Result/Status" searchColumns={["Name", "Description"]}/>
        ) : (
          <DataTable columns={offenderColumns} data={data.filter(report => report.offender?.steam === playerHex)} filterColumn="Result/Status" searchColumns={["Name", "Description"]}/>
        )
      }
    </div>
  )
}

export default ReportsCreatedTable;