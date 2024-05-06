import { z } from 'zod'

export const UserSchema = z.object({
	id: z.number().nullish(),
	name: z.string().min(1, 'Name is required'),
	rate: z.number().min(1, 'Rate is required'),
})

export type User = z.infer<typeof UserSchema>