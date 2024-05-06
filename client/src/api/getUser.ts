import { User } from '@/models/user'
import axios from 'axios'

export default async function getUser() {
	return axios.get(`${import.meta.env.VITE_BASE_URL}/user`).then((res) => res.data as User)
}
