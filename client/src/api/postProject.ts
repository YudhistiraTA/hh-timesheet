import { Project } from '@/models/projects'
import axios from 'axios'

export default async function postProject(project: Project) {
	return axios
		.post(`${import.meta.env.VITE_BASE_URL}/projects`, project)
		.then((res) => res.data as Project)
}
