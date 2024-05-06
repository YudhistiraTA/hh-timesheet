import { z } from 'zod'

export const ActivitySchema = z.object({
	id: z.number().nullish(),
	name: z.string().min(1, 'Name is required'),
	date_start: z.date({ message: 'Date start is required' }),
	date_end: z.date({ message: 'Date end is required' }),
	time_start: z.string().min(1, 'Time start is required'),
	time_end: z.string().min(1, 'Time end is required'),
	project_id: z.number().min(1, 'Project is required'),
	project_name: z.string().nullish(),
})

export type Activity = z.infer<typeof ActivitySchema>
