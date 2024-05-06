import { cn, extendedDayjs, moneyFormatter } from '@/lib/utils'
import { Activity } from '@/models/activity'
import { User } from '@/models/user'
import { useMemo } from 'react'

interface ActivityTableSummaryProps
	extends Partial<React.HTMLAttributes<HTMLDivElement>> {
	activities: Activity[] | undefined
	user: User | undefined
}

export default function ActivityTableSummary({
	activities,
	user,
	...props
}: ActivityTableSummaryProps) {
	const totalMinutes = useMemo(
		() =>
			activities?.reduce((acc, activity) => {
				const startTime = extendedDayjs(activity.time_start, 'HH:mm:ss')
				const start = extendedDayjs(activity.date_start)
					.add(startTime.hour(), 'hour')
					.add(startTime.minute(), 'minute')
				const endTime = extendedDayjs(activity.time_end, 'HH:mm:ss')
				const end = extendedDayjs(activity.date_end)
					.add(endTime.hour(), 'hour')
					.add(endTime.minute(), 'minute')
				const minute = end.diff(start, 'm')
				return acc + minute
			}, 0),
		[activities],
	)
	const totalHours = useMemo(() => {
		if (totalMinutes) return Math.floor(totalMinutes / 60)
		else return 0
	}, [totalMinutes])
	if (!activities || !totalMinutes) return null
	return (
		<div
			{...props}
			className={cn(
				'flex justify-between bg-timesheet-background',
				props.className,
			)}
		>
			<div className="flex flex-col gap-1">
				<p>Total Durasi</p>
				<p className="font-bold text-lg">Total Pendapatan</p>
			</div>
			<div className="flex flex-col gap-1 text-end">
				<p>
					{totalHours ? `${totalHours} jam` : ''}{' '}
					{totalMinutes ? `${totalMinutes % 60} menit` : ''}
				</p>
				<p className="font-bold text-lg">
					{user?.rate && moneyFormatter.format(user.rate * totalHours)}
				</p>
			</div>
		</div>
	)
}
