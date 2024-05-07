import { Activity } from '@/models/activity'
import axios from 'axios'

export default async function putActivity(activity: Activity) {
	return axios
		.put(`${import.meta.env.VITE_BASE_URL}/activities/${activity.id}`, activity)
		.then((res) => res.data as Activity)
}
