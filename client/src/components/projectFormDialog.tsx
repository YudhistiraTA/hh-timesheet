import postProject from '@/api/postProject'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
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
import { Project, ProjectSchema } from '@/models/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import Swal from 'sweetalert2'

export default function ProjectFormDialog() {
	const form = useForm<Project>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: {
			name: '',
		},
	})
	const queryClient = useQueryClient()
	const projectMutation = useMutation({
		mutationFn: postProject,
		onSuccess: () => {
			queryClient.invalidateQueries('projects')
      Swal.fire({
				title: "Project Created!",
				icon: 'success',
				timer: 1000,
				timerProgressBar: true,
				showConfirmButton: false,
				willClose: () => {
					clearInterval(1000)
				},
			})
		},
		onError: () => {
			Swal.fire({
				title: 'Error!',
				text: 'Something went wrong',
				icon: 'error',
				timer: 1000,
				timerProgressBar: true,
				showConfirmButton: false,
				willClose: () => {
					clearInterval(1000)
				},
			})
		},
	})
  function onSubmit(data: Project) {
    projectMutation.mutate(data)

  }
	return (
		<Dialog>
			<DialogTrigger className="hover:cursor-pointer hover:bg-timesheet-background text-timesheet-red font-bold w-full h-full p-2 px-6 text-start">
				+ Tambah Proyek
			</DialogTrigger>
			<DialogContent className="max-w-none w-3/5">
				<DialogHeader>
					<DialogTitle className="font-bold">Tambah Proyek Baru</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="flex flex-col my-4">
									<FormLabel className="text-muted-foreground">
										Nama Proyek
										<span className="text-timesheet-red"> *</span>
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
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
					<DialogClose asChild>
						<Button
							type="button"
							variant="destructive"
							onClick={form.handleSubmit(onSubmit)}
						>
							Simpan
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
