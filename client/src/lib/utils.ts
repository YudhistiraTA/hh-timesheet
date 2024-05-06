import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const moneyFormatter = Intl.NumberFormat('id-ID', {
	currency: 'IDR',
	style: 'currency',
	maximumFractionDigits: 0,
})

dayjs.extend(customParseFormat)
export const extendedDayjs = dayjs

export function debounceHTML(
	fn: (event: React.ChangeEvent<HTMLInputElement>) => void,
	delay: number,
) {
	let timeoutId: NodeJS.Timeout
	return (event: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => fn(event), delay)
	}
}
