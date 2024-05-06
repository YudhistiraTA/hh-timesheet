import { User } from '@/models/user'
import axios from 'axios'

export default async function putUser(user: User) {
	return axios.put(`${import.meta.env.VITE_BASE_URL}/user/${user.id}`, user)
}
