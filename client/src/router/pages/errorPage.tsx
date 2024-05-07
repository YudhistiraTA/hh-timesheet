import { Button } from '@/components/ui/button'
import { useNavigate, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
	const error = useRouteError() as { statusText: string; message: string }
	const navigate = useNavigate()
	return (
		<div
			id="error-page"
			className="flex justify-center items-center bg-timesheet-background h-screen w-screen"
		>
			<div className="flex flex-col bg-white rounded-xl p-6 gap-2 justify-center items-center">
				<h1 className='font-bold text-lg'>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>{error.statusText || error.message}</i>
				</p>
				<Button className='bg-timesheet-red hover:bg-timesheet-red hover:bg-opacity-90' onClick={() => navigate(-1)}>Return to previous page</Button>
			</div>
		</div>
	)
}
