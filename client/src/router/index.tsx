import ActivityList from '@/router/pages/activityList'
import ErrorPage from '@/router/pages/errorPage'
import RootLayout from '@/router/pages/rootLayout'
import SettingsPage from '@/router/pages/settingsPage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '',
				element: <ActivityList />,
			},
			{
				path: '/settings',
				element: <SettingsPage />,
			},
		],
	},
])
export default router
