import { DataTable } from '@/components/ui/dataTable'
import { extendedDayjs } from '@/lib/utils'
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
		cell: (cell) => (
			<div>
				{extendedDayjs(cell.getValue() as string)
					.locale('id')
					.format('DD MMM YYYY')}
			</div>
		),
	},
	{
		accessorKey: 'date_end',
		header: 'Tanggal Berakhir',
		cell: (cell) => (
			<div>
				{extendedDayjs(cell.getValue() as string)
					.locale('id')
					.format('DD MMM YYYY')}
			</div>
		),
	},
	{
		accessorKey: 'time_start',
		header: 'Waktu Mulai',
		cell: (cell) => (
			<div>
				{extendedDayjs(cell.getValue() as string, 'HH:mm:ss')
					.locale('id')
					.format('HH:mm')}
			</div>
		),
	},
	{
		accessorKey: 'time_end',
		header: 'Waktu Berakhir',
		cell: (cell) => (
			<div>
				{extendedDayjs(cell.getValue() as string, 'HH:mm:ss')
					.locale('id')
					.format('HH:mm')}
			</div>
		),
	},
	{
		header: 'Durasi',
		cell: ({ row }) => {
			const startTime = extendedDayjs(row.original.time_start, 'HH:mm:ss')
			const start = extendedDayjs(row.original.date_start)
				.add(startTime.hour(), 'hour')
				.add(startTime.minute(), 'minute')
			const endTime = extendedDayjs(row.original.time_end, 'HH:mm:ss')
			const end = extendedDayjs(row.original.date_end)
				.add(endTime.hour(), 'hour')
				.add(endTime.minute(), 'minute')
			const day = end.diff(start, 'd')
			const hour = end.diff(start, 'h')
			const minute = end.diff(start, 'm') % 60
			return (
				<div>
					{day > 0 && `${day} hari`} {hour > 0 && `${hour} jam`}{' '}
					{minute > 0 && `${minute} menit`}
				</div>
			)
		},
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
