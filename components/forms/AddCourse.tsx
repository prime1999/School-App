"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { courseSchema } from "@/lib/Validation";
import { MdNumbers, MdTextFields, MdOutlineLocationOn } from "react-icons/md";
import DayAndTime from "../DayAndTime";
import { useState } from "react";
import SubmitButton from "@/lib/utils/SubmitButton";

const days = [
	{ name: "Monday", value: "monday" },
	{ name: "Tuesday", value: "tuesday" },
	{ name: "Wednesday", value: "wednesday" },
	{ name: "Thursday", value: "thursday" },
	{ name: "Friday", value: "friday" },
];

const AddCourse = () => {
	const [startDate, setStartDate] = useState<any>(new Date());
	const [endDate, setEndDate] = useState<any>(new Date());
	const [day, setDay] = useState<string>("");
	const [schedule, setSchedule] = useState<any>([]);
	const form = useForm<z.infer<typeof courseSchema>>({
		resolver: zodResolver(courseSchema),
		defaultValues: {
			courseCode: "",
			courseTitle: "",
			courseUnit: 0,
			lecturer: "",
			startTime: "",
			endTime: "",
			venue: "",
		},
	});

	const handleSelect = (value: string) => {
		setDay(value);
	};
	const handleSetDate = (e: any) => {
		e.preventDefault();
		const newSchedule = {
			day,
			startDate,
			endDate,
		};
		setSchedule((prev: any) => [...prev, newSchedule]);
	};

	const removeSchedule = (day: string, startDate: string, endDate: string) => {
		//e.preventDefault();
		console.log({ day, startDate, endDate });
		const filteredSchedule = schedule.filter(
			(list: any) =>
				list.day !== day &&
				list.startDate !== startDate &&
				list.endDate !== endDate
		);
		setSchedule(filteredSchedule);
	};

	const onSubmit = async (values: z.infer<any>) => {};
	return (
		<main>
			<h4 className="mt-8 font-inter">
				Check, Add, update and remove your courses here for better App
				experience.
			</h4>
			<div className="mt-8">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-start flex-wrap gap-4 space-y-6 w-full mx-auto"
					>
						<CustomFormField
							fieldType={FormFieldType.input}
							control={form.control}
							name="courseTitle"
							label="Course Title"
							placeholder="Title of the course"
							type="text"
							iconSrc={<MdTextFields />}
							className="w-[400px]"
						/>
						<CustomFormField
							fieldType={FormFieldType.input}
							control={form.control}
							name="courseCode"
							label="Course-Code"
							placeholder="course code"
							type="text"
							iconSrc={<MdTextFields />}
						/>
						<CustomFormField
							fieldType={FormFieldType.input}
							control={form.control}
							name="unit"
							label="Course-Unit"
							placeholder="course unit"
							type="number"
							inputMode="numeric"
							iconSrc={<MdNumbers />}
						/>
						<CustomFormField
							fieldType={FormFieldType.input}
							control={form.control}
							name="lecturer"
							label="Lecturer"
							placeholder="lecturer"
							type="text"
							iconSrc={<MdTextFields />}
							className="w-[300px]"
						/>
						<CustomFormField
							fieldType={FormFieldType.input}
							control={form.control}
							name="venue"
							label="Venue"
							placeholder="venue"
							type="text"
							iconSrc={<MdOutlineLocationOn />}
						/>
						<DayAndTime
							startDate={startDate}
							endDate={endDate}
							day={day}
							setStartDate={setStartDate}
							setEndDate={setEndDate}
							setDay={setDay}
							handleSelect={handleSelect}
							form={form}
							array={days}
							handleSetDate={handleSetDate}
							schedule={schedule}
							removeSchedule={removeSchedule}
						/>
					</form>
				</Form>
			</div>
			<SubmitButton
				isLoading={false}
				className="w-1/2 mx-auto flex justify-center mt-4 bg-green-400 text-black rounded-lg font-inter font-bold"
			>
				Add Course
			</SubmitButton>
		</main>
	);
};

export default AddCourse;
