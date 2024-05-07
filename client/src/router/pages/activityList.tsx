import getActivities from '@/api/getActivities'
import getUser from '@/api/getUser'
import ActivityListHeader from '@/components/activityListHeader'
import ActivityTable from '@/components/activityTable'
import ActivityTableSummary from '@/components/activityTableSummary'
import UserInfo from '@/components/userInfo'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

export default function ActivityList() {
	const [searchParams] = useSearchParams()
	const search = useMemo(() => searchParams.get('search') || '', [searchParams])
	const projects = useMemo(
		() => searchParams.get('projects') || '',
		[searchParams],
	)
	const { data: user } = useQuery({
		queryKey: 'user',
		queryFn: () => getUser(),
	})
	const { data: activities } = useQuery({
		queryKey: ['activities', search, projects],
		queryFn: () =>
			getActivities({
				search,
				projects,
			}),
	})
	return (
		<main className="bg-timesheet-background flex grow">
			<div className="flex flex-col grow m-6 bg-white rounded-xl w-full">
				<UserInfo user={user} className="p-6 pb-4" />
				<ActivityListHeader className="p-6" />
				<ActivityTable
					className="mx-6 rounded-b-none"
					activities={activities}
				/>
				<ActivityTableSummary
					className="mx-6 p-4 border rounded-b text-timesheet-blue mb-4"
					user={user}
					activities={activities}
				/>
			</div>
		</main>
	)
}
