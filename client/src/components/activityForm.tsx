import getProjects from '@/api/getProjects'
import getUser from '@/api/getUser'
import postActivity from '@/api/postActivity'
import putActivity from '@/api/putActivity'
import ProjectFormDialog from '@/components/projectFormDialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn, extendedDayjs } from '@/lib/utils'
import { Activity, ActivitySchema } from '@/models/activity'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Clock } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Swal from 'sweetalert2'

export default function ActivityForm({
	defaultValues = {
		time_start: '',
		time_end: '',
		name: '',
	},
	setDialogOpen,
}: {
	defaultValues?: Partial<Activity>
	setDialogOpen?: Dispatch<SetStateAction<boolean>>
}) {
	const form = useForm<Activity>({
		resolver: zodResolver(ActivitySchema),
		defaultValues: {
			...defaultValues,
			date_start: new Date(defaultValues.date_start || new Date()),
			date_end: new Date(defaultValues.date_end || new Date()),
		},
	})
	const { data } = useQuery({
		queryKey: 'projects',
		queryFn: () => getProjects(),
	})
	const { data: user } = useQuery({
		queryKey: 'user',
		queryFn: () => getUser(),
	})

	const queryClient = useQueryClient()
	const activityMutation = useMutation({
		mutationFn: defaultValues.id ? putActivity : postActivity,
		onSuccess: () => {
			queryClient.invalidateQueries('activities')
			Swal.fire({
				title: `Activity ${defaultValues.id ? 'Updated' : 'Created'}!`,
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
				showConfirmButton: false,
				willClose: () => {
					clearInterval(2000)
				},
			})
			if (setDialogOpen) setDialogOpen(false)
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
	function onSubmit(data: Activity) {
		activityMutation.mutate({ ...data, user_id: user?.id })
	}
	return (
		<DialogContent className="max-w-none w-3/5">
			<DialogHeader>
				<DialogTitle className="font-bold">
					{defaultValues.id ? 'Ubah Kegiatan' : 'Tambah Kegiatan Baru'}
				</DialogTitle>
			</DialogHeader>
			<div className="border-t pt-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(console.log)}>
						<div className="flex gap-2">
							<FormField
								control={form.control}
								name="date_start"
								render={({ field }) => (
									<FormItem className="flex flex-col w-1/4">
										<FormLabel className="text-muted-foreground">
											Tanggal Mulai
											<span className="text-timesheet-red"> *</span>
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'pl-3 text-left font-normal',
															!field.value && 'text-muted-foreground',
														)}
													>
														{field.value ? (
															extendedDayjs(field.value)
																.locale('id')
																.format('DD MMM YYYY')
														) : (
															<span>
																{extendedDayjs()
																	.locale('id')
																	.format('DD MMM YYYY')}
															</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="date_end"
								render={({ field }) => (
									<FormItem className="flex flex-col w-1/4">
										<FormLabel className="text-muted-foreground">
											Tanggal Selesai
											<span className="text-timesheet-red"> *</span>
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'pl-3 text-left font-normal',
															!field.value && 'text-muted-foreground',
														)}
													>
														{field.value ? (
															extendedDayjs(field.value)
																.locale('id')
																.format('DD MMM YYYY')
														) : (
															<span>
																{extendedDayjs()
																	.locale('id')
																	.format('DD MMM YYYY')}
															</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="time_start"
								render={({ field }) => (
									<FormItem className="flex flex-col w-1/4">
										<FormLabel className="text-muted-foreground">
											Waktu Mulai
											<span className="text-timesheet-red"> *</span>
										</FormLabel>
										<FormControl>
											<Input
												type="time"
												{...field}
												endAdornment={
													<Clock height={18} className="opacity-50" />
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="time_end"
								render={({ field }) => (
									<FormItem className="flex flex-col w-1/4">
										<FormLabel className="text-muted-foreground">
											Waktu Selesai
											<span className="text-timesheet-red"> *</span>
										</FormLabel>
										<FormControl>
											<Input
												type="time"
												{...field}
												endAdornment={
													<Clock height={18} className="opacity-50" />
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="flex flex-col my-4">
									<FormLabel className="text-muted-foreground">
										Judul Kegiatan
										<span className="text-timesheet-red"> *</span>
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="project_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-muted-foreground">
										Nama Proyek
										<span className="text-timesheet-red"> *</span>
									</FormLabel>
									<Select
										onValueChange={(e) => field.onChange(+e)}
										defaultValue={String(field.value)}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a project" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel className='w-full h-full p-0'>
													<ProjectFormDialog />
												</SelectLabel>
												{data
													? data.map((project) => (
															<SelectItem
																key={project.id}
																value={String(project.id)}
															>
																{project.name}
															</SelectItem>
													  ))
													: null}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
			<DialogFooter className="mt-2 pt-4 border-t">
				<DialogClose asChild>
					<Button
						type="button"
						variant="ghost"
						className="text-timesheet-red hover:bg-white hover:text-timesheet-red"
					>
						Kembali
					</Button>
				</DialogClose>
				<Button
					type="button"
					variant="destructive"
					onClick={form.handleSubmit(onSubmit)}
				>
					Simpan
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
