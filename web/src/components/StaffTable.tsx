import { Staff, StaffStatsOverview } from '@/types/types'
import { DataTable } from './ui/data-table'
import { DataTableColumnHeader } from './ui/data-table-culumn-header'
import { ColumnDef } from '@tanstack/react-table'

type props = {
    data: StaffStatsOverview[],
    onSelect: (staffId: string) => void,
    classname?: string,
  }

const StaffTable = ({ data, onSelect, classname }: props) => {
    return (
      <div className={`${classname}`}>
        <DataTable onSelect={(row) => onSelect(row.staff.discordId)} columns={createdColumns} data={data} searchColumns={["Name", "Discord ID"]} fullyHiddenCols={["Discord ID"]}/>
      </div>
    )
  }

export default StaffTable

const createdColumns: ColumnDef<StaffStatsOverview>[] = [
    {
      id: "Name",
      accessorKey: "staff.name",
      header: ({ column }) => (
        <DataTableColumnHeader className="justify-center" column={column} title="Staff" />
      ),
      cell({ getValue }) {
        const staff: string | undefined = getValue() as string | undefined;
  
        return staff ? <div className="break-all">{staff}</div> : "None";
      },
    },
    {
      id: "Discord ID",
      accessorKey: "staff.discordId",
      header: ({ column }) => {
        column.toggleVisibility(false);
        return null;
      },
      cell: ({ getValue }) => null,
    },
    {
      id: "# Responses",
      accessorKey: "numResponses",
      cell({ getValue }) {
        const numResponses: number = getValue() as number;
  
        return <div className="break-all">{numResponses}</div>;
      },
      header: ({ column }) => (
        <DataTableColumnHeader className="justify-center" column={column} title="Responses" />
      ),
    },
    {
      id: "# Solved",
      accessorKey: "numSolved",
      cell: ({ getValue }) => {
          const numSolved: number = getValue() as number;
          
          return <div className="break-all">{numSolved}</div>;
        },
        header: ({ column }) => (
          <DataTableColumnHeader className="justify-center" column={column} title="Solved" />
        ),
    },
    {
      id: "# Punishments",
      accessorKey: "punishmentCounts",
      cell: ({ getValue }) => {
        const punishmentData = getValue() as StaffStatsOverview["punishmentCounts"];
          
          return <div className="break-all">{punishmentData.bans + punishmentData.kicks + punishmentData.warns}</div>;
        },
        header: ({ column }) => (
          <DataTableColumnHeader className="justify-center" column={column} title="Punishments" />
        ),
    },
    {
      id: "# Non-Punishments",
      accessorKey: "punishmentCounts",
      cell: ({ getValue }) => {
          const punishmentData = getValue() as StaffStatsOverview["punishmentCounts"];
          
          return <div className="break-all">{punishmentData.verbals + punishmentData.other + punishmentData.nothing}</div>;
        },
        header: ({ column }) => (
          <DataTableColumnHeader className="justify-center" column={column} title="Non-Punishments" />
        ),
    },
    {
      id: "Response Time",
      accessorKey: "avgWaitTime",
      cell: ({ getValue }) => {
          const avgWaitTime: number = getValue() as number;
          
          return <div className="break-all">{Math.round(avgWaitTime * 10) / 10} s</div>;
        },
        header: ({ column }) => (
          <DataTableColumnHeader className="justify-center" column={column} title="Response Time" />
        ),
    },
]
