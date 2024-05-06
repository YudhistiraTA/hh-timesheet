import getProjects from '@/api/getProjects'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()
export default function FilterForm() {
	const { data } = useQuery({
		queryKey: 'projects',
		queryFn: () => getProjects(),
	})
	const [searchParams, setSearchParams] = useSearchParams()
	const filter = useMemo(
		() => (searchParams.get('filter') || '').split(','),
		[searchParams],
	)
	const options = useMemo(
		() =>
			data?.map((project) => ({
				value: project.name.toLowerCase().replace(' ', '-'),
				label: project.name,
			})),
		[data],
	)
	const [selectedOption, setSelectedOption] = useState<
		Readonly<typeof options>
	>([])
	useEffect(() => {
		if (options)
			setSelectedOption(
				options.filter((option) => filter.includes(option.value)),
			)
	}, [options, filter])

	function onSubmit() {
		const filter = (selectedOption?.map((option) => option.value) || []).join(
			',',
		)
		setSearchParams({ ...Object.fromEntries(searchParams), filter })
	}
	function clearFilter() {
		setSearchParams({ ...Object.fromEntries(searchParams), filter: '' })
	}
	if (!data || !options) return null
	return (
		<>
			<div className="border-t">
				<div>
					<Select
						closeMenuOnSelect={false}
						components={animatedComponents}
						isMulti
						options={options}
						defaultValue={options.filter((option) =>
							filter.includes(option.value),
						)}
						onChange={(e) => setSelectedOption(e)}
						styles={{
							multiValue: (styles) => ({ ...styles, borderRadius: '1rem' }),
							multiValueRemove: (styles) => ({
								...styles,
								':hover': { backgroundColor: 'inherit', borderRadius: '1rem' },
							}),
						}}
					/>
				</div>
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button
						type="button"
						variant="ghost"
						className="text-timesheet-red hover:bg-white hover:text-timesheet-red"
						onClick={() => clearFilter()}
					>
						Hapus Filter
					</Button>
				</DialogClose>
				<DialogClose asChild>
					<Button
						type="button"
						variant="destructive"
						onClick={() => onSubmit()}
					>
						Terapkan
					</Button>
				</DialogClose>
			</DialogFooter>
		</>
	)
}