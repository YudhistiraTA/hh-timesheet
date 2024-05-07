import deleteActivity from '@/api/deleteActivity'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/dataTable'
import { extendedDayjs } from '@/lib/utils'
import { Activity } from '@/models/activity'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronsUpDown, Trash } from 'lucide-react'
import { useMemo } from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface ActivityTableProps
	extends Partial<React.HTMLAttributes<HTMLDivElement>> {
	activities: Activity[] | undefined
}

export default function ActivityTable({
	activities,
	...props
}: ActivityTableProps) {
	if (!activities) activities = []
	const queryClient = useQueryClient()
	const deleteMutation = useMutation({
		mutationFn: deleteActivity,
		onSuccess: () => {
			queryClient.invalidateQueries('activities')
		},
	})
	const columns: ColumnDef<Activity>[] = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Email
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
			},
			{
				accessorKey: 'project_name',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Nama Proyek
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
			},
			{
				accessorKey: 'date_start',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Tanggal Mulai
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
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
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Tanggal Berakhir
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
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
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Waktu Mulai
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
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
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Waktu Berakhir
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (cell) => (
					<div>
						{extendedDayjs(cell.getValue() as string, 'HH:mm:ss')
							.locale('id')
							.format('HH:mm')}
					</div>
				),
			},
			{
				accessorKey: 'id',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Durasi
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
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
					const hour = end.diff(start, 'h') % 24
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
				cell: ({ row }) => (
					<div className="flex gap-1">
						<Button
							variant="ghost"
							className="text-timesheet-red"
							onClick={() => deleteMutation.mutate(row.getValue('id'))}
						>
							<Trash height={16} />
						</Button>
					</div>
				),
			},
		],
		[],
	)
	return (
		<DataTable
			{...props}
			columns={columns}
			data={activities}
			emptyMessage="Belum ada kegiatan"
		/>
	)
}
