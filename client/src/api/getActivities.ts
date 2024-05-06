import { Activity } from '@/models/activity'
import axios from 'axios'

export default async function getActivities() {
	return axios
		.get(`${import.meta.env.VITE_BASE_URL}/activities`)
		.then((res) => res.data as Activity[])
}
