import getUser from '@/api/getUser'
import { SettingsForm, SettingsFormSkeleton } from '@/components/settingsForm'
import { useQuery } from 'react-query'

export default function SettingsPage() {
	const { data } = useQuery({ queryKey: 'user', queryFn: () => getUser() })
	if (!data)
		return (
			<main className="bg-timesheet-background flex grow justify-center items-center">
				<SettingsFormSkeleton />
			</main>
		)
	return (
		<main className="bg-timesheet-background flex grow justify-center items-center">
			<SettingsForm user={data} />
		</main>
	)
}
