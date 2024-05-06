'use client'
import { useReducer } from 'react'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form' // Shadcn UI import
import { Input } from '../ui/input' // Shandcn UI Input
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'

type TextInputProps = {
	form: UseFormReturn<any>
	name: string
	label: string
	placeholder: string
	labelClassName?: string
	inputClassName?: string
}

// Brazilian currency config
const moneyFormatter = Intl.NumberFormat('id-ID', {
	currency: 'IDR',
	style: 'currency',
	maximumFractionDigits: 0,
})

export default function CurrencyInput(props: TextInputProps) {
	const initialValue = props.form.getValues()[props.name]
		? moneyFormatter.format(props.form.getValues()[props.name])
		: ''

	const [value, setValue] = useReducer((_: unknown, next: string) => {
		const digits = next.replace(/\D/g, '')
		return moneyFormatter.format(Number(digits))
	}, initialValue)

	function handleChange(realChangeFn: Function, formattedValue: string) {
		const digits = formattedValue.replace(/\D/g, '')
		const realValue = Number(digits)
		realChangeFn(realValue)
	}

	return (
		<FormField
			control={props.form.control}
			name={props.name}
			render={({ field }) => {
				field.value = value
				const _change = field.onChange

				return (
					<FormItem>
						<FormLabel className={cn(props.labelClassName)}>
							{props.label}
						</FormLabel>
						<FormControl>
							<Input
								placeholder={props.placeholder}
								type="text"
								className={cn(props.inputClassName)}
								{...field}
								onChange={(ev) => {
									setValue(ev.target.value)
									handleChange(_change, ev.target.value)
								}}
								value={value}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}
