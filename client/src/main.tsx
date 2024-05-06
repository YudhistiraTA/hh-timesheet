import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'

const second = 1000
const minutes = 60 * second

const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 5 * minutes } },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
)
