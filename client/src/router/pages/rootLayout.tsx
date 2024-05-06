import Header from '@/components/header'
import TabSelection from '@/components/tabSelection'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
	return (
		<div className="flex flex-col min-h-screen h-full">
			<Header />
			<TabSelection />
			<Outlet />
		</div>
	)
}
