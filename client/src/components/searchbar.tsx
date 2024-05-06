import FilterForm from '@/components/filterForm'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { debounceHTML } from '@/lib/utils'
import { ListFilter, Search } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Searchbar() {
	const [searchParams, setSearchParams] = useSearchParams()
	const projects = searchParams.get('projects')
	const search = useMemo(
		() =>
			debounceHTML((event) => {
				setSearchParams({
					...Object.fromEntries(searchParams),
					search: event.target.value,
				})
			}, 500),
		[searchParams, setSearchParams],
	)
	return (
		<>
			<Input startAdornment={<Search />} placeholder="Cari" onChange={search} />
			<Dialog>
				<DialogTrigger className="relative border p-2 rounded-lg text-timesheet-red">
					<ListFilter />
					{projects && (
						<div className="absolute w-3 h-3 rounded-full border-2 border-white bg-timesheet-blue top-1.5 right-1.5"></div>
					)}
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className='font-bold'>Filter</DialogTitle>
					</DialogHeader>
					<FilterForm />
				</DialogContent>
			</Dialog>
		</>
	)
}
