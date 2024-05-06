import putUser from '@/api/putUser'
import { Button } from '@/components/ui/button'
import CurrencyInput from '@/components/ui/currencyInput'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { User, UserSchema } from '@/models/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export function SettingsForm({ user }: { user: User }) {
	const form = useForm<User>({
		resolver: zodResolver(UserSchema),
		defaultValues: user,
	})
	const queryClient = useQueryClient()
	const userMutation = useMutation({
		mutationFn: putUser,
		onSuccess: () => {
			queryClient.invalidateQueries('user')
			Swal.fire({
				title: 'User Updated!',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
				showConfirmButton: false,
				willClose: () => {
					clearInterval(2000)
				},
			})
		},
		onError: () => {
			Swal.fire({
				title: 'Error!',
				text: 'Something went wrong',
				icon: 'error',
				timer: 2000,
				timerProgressBar: true,
				showConfirmButton: false,
				willClose: () => {
					clearInterval(2000)
				},
			})
		},
	})
	function onSubmit(data: User) {
		userMutation.mutate(data)
	}
	const navigate = useNavigate()
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-1/4 bg-white rounded-xl p-8"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="opacity-80">Nama</FormLabel>
							<FormControl>
								<Input placeholder="Nama" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<CurrencyInput
					form={form}
					label="Rate"
					labelClassName="opacity-80"
					name="rate"
					placeholder="Rate"
					endAdornment={<span className="text-gray-400">/jam</span>}
				/>
				<div className="flex w-full justify-center gap-4">
					<Button
						type="button"
						variant="secondary"
						className="w-1/2 text-timesheet-blue font-bold"
						onClick={() => navigate('/')}
					>
						Batalkan
					</Button>
					<Button
						type="submit"
						className="w-1/2 bg-timesheet-blue hover:bg-timesheet-blue hover:bg-opacity-90 font-bold text-white"
					>
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	)
}

export function SettingsFormSkeleton() {
	return (
		<div className="flex flex-col gap-4 w-1/4 bg-white rounded-xl p-8">
			<Skeleton className="h-5 w-16" />
			<Skeleton className="h-9 w-full" />
			<Skeleton className="h-5 w-16" />
			<Skeleton className="h-9 w-full" />
			<div className="flex w-full justify-center gap-4">
				<Skeleton className="w-1/2 h-10" />
				<Skeleton className="w-1/2 h-10" />
			</div>
		</div>
	)
}
