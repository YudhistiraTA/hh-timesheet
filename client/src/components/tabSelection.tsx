import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'

export default function TabSelection() {
	const { pathname } = useLocation()
	return (
		<div>
			<h2 className="text-4xl font-bold mx-4 my-6">HH Timesheet</h2>
			<NavigationMenu className="mx-12">
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link
							to="/"
							className={cn(
								navigationMenuTriggerStyle(),
								'font-bold opacity-70 rounded-none',
								{
									'opacity-100 text-timesheet-blue border-b-4 hover:text-timesheet-blue focus:text-timesheet-blue focus:bg-inherit border-timesheet-blue':
										pathname === '/',
								},
							)}
						>
							Daftar Kegiatan
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link
							to="/settings"
							className={cn(
								navigationMenuTriggerStyle(),
								'font-bold opacity-70 rounded-none',
								{
									'opacity-100 text-timesheet-blue border-b-4 hover:text-timesheet-blue focus:text-timesheet-blue focus:bg-inherit border-timesheet-blue':
										pathname === '/settings',
								},
							)}
						>
							Pengaturan
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
