import { DataTable } from '@/components/ui/dataTable'
import { Activity } from '@/models/activity'
import { ColumnDef } from '@tanstack/react-table'
const columns: ColumnDef<Activity>[] = [
	{
		accessorKey: 'name',
		header: 'Judul Kegiatan',
	},
	{
		accessorKey: 'project_name',
		header: 'Nama Proyek',
	},
	{
		accessorKey: 'date_start',
		header: 'Tanggal Mulai',
	},
	{
		accessorKey: 'date_end',
		header: 'Tanggal Berakhir',
	},
	{
		accessorKey: 'time_start',
		header: 'Waktu Mulai',
	},
	{
		accessorKey: 'time_end',
		header: 'Waktu Berakhir',
	},
	{
		header: 'Durasi',
		cell: () => <div>test</div>,
	},
	{
		header: 'Aksi',
		cell: () => <div>test</div>,
	},
]

export default function ActivityTable({
	activities,
}: {
	activities: Activity[] | undefined
}) {
	if (!activities) activities = []
	return (
		<DataTable
			columns={columns}
			data={activities}
			emptyMessage="Belum ada kegiatan"
		/>
	)
}
