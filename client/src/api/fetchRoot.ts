import axios from 'axios'

export default async function fetchRoot() {
	return axios.get(import.meta.env.VITE_BASE_URL).then((res) => res.data)
}
