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
	const projects = useMemo(
		() => (searchParams.get('projects') || '').split(','),
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
				options.filter((option) => projects.includes(option.value)),
			)
	}, [options, projects])

	function onSubmit() {
		const projects = (selectedOption?.map((option) => option.value) || []).join(
			',',
		)
		setSearchParams({ ...Object.fromEntries(searchParams), projects })
	}
	function clearProjects() {
		setSearchParams({ ...Object.fromEntries(searchParams), projects: '' })
	}
	if (!data || !options) return null
	return (
		<>
			<div className="border-t pt-6">
				<div className="flex flex-col gap-1">
					<p className="text-sm text-muted-foreground">
						Proyek <span className="text-timesheet-red">*</span>
					</p>
					<Select
						closeMenuOnSelect={false}
						components={animatedComponents}
						isMulti
						options={options}
						defaultValue={options.filter((option) =>
							projects.includes(option.value),
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
			<DialogFooter className='mt-2 pt-4 border-t'>
				<DialogClose asChild>
					<Button
						type="button"
						variant="ghost"
						className="text-timesheet-red hover:bg-white hover:text-timesheet-red"
						onClick={() => clearProjects()}
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
