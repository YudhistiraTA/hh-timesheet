import { Activity } from '@/models/activity'
import axios from 'axios'

export default async function getActivities({
	projects,
	search,
}: {
	search?: string | null
	projects?: string | null
}) {
	return axios
		.get(`${import.meta.env.VITE_BASE_URL}/activities`, {
			params: { search, projects: projects?.replace('-', ' ') },
		})
		.then((res) => res.data as Activity[])
}
