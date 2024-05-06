import FilterForm from '@/components/filterForm'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ListFilter, Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

export default function Searchbar() {
	const [searchParams] = useSearchParams()
	const filter = searchParams.get('filter')
	return (
		<>
			<Input startAdornment={<Search />} placeholder="Cari" />
			<Dialog>
				<DialogTrigger className="relative border p-2 rounded-lg text-timesheet-red">
					<ListFilter />
					{filter && (
						<div className="absolute w-3 h-3 rounded-full border-2 border-white bg-timesheet-blue top-1.5 right-1.5"></div>
					)}
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Filter</DialogTitle>
					</DialogHeader>
					<FilterForm />
				</DialogContent>
			</Dialog>
		</>
	)
}
