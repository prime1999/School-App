"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BsEnvelope } from "react-icons/bs";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "@/lib/utils/SubmitButton";
import { StudenFormSchema } from "../../lib/Validation";
import "react-phone-number-input/style.css";
import { departmentsByFaculty, facultyNames } from "@/contants/Faculties.info";
import { levels, Universities } from "@/contants/Schools.info";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

declare type Gender = "Male" | "Female";

const GenderOptions = ["Male", "Female"];

const StudentForm = () => {
	const [faculties, setFaculties] = useState<any>(facultyNames);
	const [departments, setdepartments] = useState<any>(null);
	const [Level, setLevel] = useState<{}[]>(levels);

	const { isLoading, student } = useSelector((state: any) => state.student);
	console.log(student);

	const form = useForm<z.infer<typeof StudenFormSchema>>({
		resolver: zodResolver(StudenFormSchema),
		defaultValues: {
			email: "",
			name: "",
			phone: "",
			school: "",
			faculty: "",
			department: "",
			level: "",
			gender: "Male" as Gender,
		},
	});

	useEffect(() => {
		if (student && student.email) {
			form.reset({
				email: student.email,
			});
		}
	}, [student]);
	const handleSelect = (value: string) => {
		const departments = departmentsByFaculty[value];
		setdepartments(departments);
	};

	const onSubmitForm = (values: z.infer<typeof StudenFormSchema>) => {
		console.log({ values });
	};
	return (
		<main className="">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmitForm)}
					className="space-y-6 w-full mx-auto"
				>
					<h1>Personal Information</h1>
					<CustomFormField
						fieldType={FormFieldType.input}
						control={form.control}
						name="name"
						label="name"
						placeholder="ex: John Doe"
						type="text"
						iconSrc=""
					/>
					<div className="flex items-center gap-4 w-full">
						<div className="w-full">
							<CustomFormField
								fieldType={FormFieldType.input}
								control={form.control}
								name="email"
								label="Email"
								placeholder="your email"
								type="email"
								inputMode="numeric"
								iconSrc={<BsEnvelope />}
								disabled={true}
							/>
						</div>
						<div className="w-full">
							<CustomFormField
								fieldType={FormFieldType.phone_input}
								control={form.control}
								name="phone"
								label="Phone Number"
								placeholder="(555) 123-4567"
							/>
						</div>
					</div>
					<h1 className="font-inter font-semibold text-2xl">
						Student Information
					</h1>
					<CustomFormField
						fieldType={FormFieldType.select}
						control={form.control}
						name="school"
						array={Universities}
						label="School"
						handleSelect={handleSelect}
						placeholder="school"
					/>
					<CustomFormField
						fieldType={FormFieldType.select}
						control={form.control}
						name="faculty"
						array={faculties}
						label="Faculty"
						handleSelect={handleSelect}
						placeholder="faculty"
					/>
					<CustomFormField
						fieldType={FormFieldType.select}
						control={form.control}
						name="department"
						label="Department"
						placeholder="department"
						array={departments}
					/>
					<div className="flex gap-4 items-center justify-between w-full">
						<div className="w-1/2">
							<CustomFormField
								fieldType={FormFieldType.select}
								control={form.control}
								name="level"
								label="Level"
								placeholder="level"
								array={Level}
							/>
						</div>
						<div>
							{" "}
							<CustomFormField
								fieldType={FormFieldType.skeleton}
								control={form.control}
								name="gender"
								label="Gender"
								renderSkeleton={(field) => (
									<FormControl>
										<RadioGroup
											className="flex h-11 gap-6 xl:justify-between"
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											{GenderOptions.map((option, i) => (
												<div key={option + i}>
													<RadioGroupItem value={option} id={option} />
													<Label htmlFor={option} className="cursor-pointer">
														{option}
													</Label>
												</div>
											))}
										</RadioGroup>
									</FormControl>
								)}
							/>
						</div>
					</div>
					<SubmitButton
						isLoading={false}
						className="w-full bg-green-400 text-black rounded-lg font-inter font-bold"
					>
						Submit Details
					</SubmitButton>
				</form>
			</Form>
		</main>
	);
};

export default StudentForm;
