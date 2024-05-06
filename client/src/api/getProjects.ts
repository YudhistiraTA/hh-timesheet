import { Project } from '@/models/projects'
import axios from 'axios'

export default async function getProjects() {
	return axios
		.get(`${import.meta.env.VITE_BASE_URL}/projects`)
		.then((res) => res.data as Project[])
}
