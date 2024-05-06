import getUser from '@/api/getUser'
import ActivityListHeader from '@/components/activityListHeader'
import UserInfo from '@/components/userInfo'
import { useQuery } from 'react-query'

export default function ActivityList() {
	const { data: user } = useQuery({
		queryKey: 'user',
		queryFn: () => getUser(),
	})
	return (
		<main className="bg-timesheet-background flex grow">
			<div className="flex flex-col grow m-6 bg-white rounded-xl w-full">
				<UserInfo user={user} className="p-6 pb-4" />
				<ActivityListHeader className='p-6'/>
			</div>
		</main>
	)
}
