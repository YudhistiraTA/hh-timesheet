import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const moneyFormatter = Intl.NumberFormat('id-ID', {
	currency: 'IDR',
	style: 'currency',
	maximumFractionDigits: 0,
})