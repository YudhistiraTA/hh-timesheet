import axios from 'axios'

export default async function deleteActivity(id: number) {
	return axios.delete(`${import.meta.env.VITE_BASE_URL}/activities/${id}`)
}
