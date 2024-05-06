import getActivities from '@/api/getActivities'
import getUser from '@/api/getUser'
import ActivityListHeader from '@/components/activityListHeader'
import ActivityTable from '@/components/activityTable'
import ActivityTableSummary from '@/components/activityTableSummary'
import UserInfo from '@/components/userInfo'
import { useQuery } from 'react-query'

export default function ActivityList() {
	const { data: user } = useQuery({
		queryKey: 'user',
		queryFn: () => getUser(),
	})
	const { data: activities } = useQuery({
		queryKey: 'activities',
		queryFn: () => getActivities(),
	})
	return (
		<main className="bg-timesheet-background flex grow">
			<div className="flex flex-col grow m-6 bg-white rounded-xl w-full">
				<UserInfo user={user} className="p-6 pb-4" />
				<ActivityListHeader className="p-6" />
				<ActivityTable className="mx-6 rounded-b-none" activities={activities} />
				<ActivityTableSummary className='mx-6 p-4 border rounded-b text-timesheet-blue' user={user} activities={activities} />
			</div>
		</main>
	)
}
