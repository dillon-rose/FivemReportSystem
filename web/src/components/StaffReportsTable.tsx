import { Results, Statuses, TReport } from "@/types/types"
import { DataTable } from "./ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./ui/data-table-culumn-header"
import { Badge } from "./ui/badge"

type props = {
    data: TReport[],
    classname?: string,
  }

const StaffReportsTable = ({ data, classname }: props) => {
    return (
      <div className={`${classname}`}>
        <DataTable columns={createdColumns} data={data} filterColumn="Result/Status" searchColumns={["Creator Name", "Offender Name", "Creator Steam", "Offender Steam", "Description"]} fullyHiddenCols={["Creator Steam", "Offender Steam"]}/>
      </div>
    )
  }

export default StaffReportsTable

const createdColumns: ColumnDef<TReport>[] = [
    {
      id: "Creator Name",
      accessorKey: "creator.name",
      header: ({ column }) => (
        // search by steam for both creator and offender
        // 
        <DataTableColumnHeader className="justify-center" column={column} title="Creator" />
      ),
      cell({ getValue }) {
        const creator: string | undefined = getValue() as string | undefined;
  
        return creator ? <div className="break-all">{creator}</div> : "None";
      },
    },
    {
      id: "Creator Steam",
      accessorKey: "creator.steam",
      header: ({ column }) => {column.toggleVisibility(false)},
    },
    {
      id: "Offender Name",
      accessorKey: "offender.name",
      header: ({ column }) => (
        <DataTableColumnHeader className="justify-center" column={column} title="Offender" />
      ),
      cell({ getValue }) {
        const offender: string | undefined = getValue() as string | undefined;
  
        return offender ? <div className="break-all">{offender}</div> : "None";
      },
    },
    {
      id: "Offender Steam",
      accessorKey: "offender.steam",
      header: ({ column }) => {column.toggleVisibility(false)},
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