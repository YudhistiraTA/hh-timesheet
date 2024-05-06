import { Button } from '@/components/ui/button'
import Searchbar from '@/components/searchbar'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'

interface ActivityListHeaderProps
	extends Partial<React.HTMLAttributes<HTMLDivElement>> {}
export default function ActivityListHeader({
	...props
}: ActivityListHeaderProps) {
	return (
		<div {...props} className={cn('flex justify-between', props.className)}>
			<div className="flex gap-4 items-center">
				<p className="font-bold text-xl">Daftar Kegiatan</p>
				<Button
					variant="ghost"
					className="flex gap-2 font-bold text-timesheet-blue bg-timesheet-blue hover:bg-timesheet-blue hover:text-timesheet-blue hover:bg-opacity-5 bg-opacity-10"
				>
					<PlusCircle />
					Tambah Kegiatan
				</Button>
			</div>
			<div className="flex gap-4 items-center">
				<Searchbar />
			</div>
		</div>
	)
}
