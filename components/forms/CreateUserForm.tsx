"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MdEmail, MdNumbers } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";

const formSchema = z.object({
	MatricNumber: z
		.number({ required_error: "Matric number is required" })
		.min(6, "Invalid Matric Number")
		.max(6, "Invalid Matric Number"),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
			message: "Password must contain letters and at least one number",
		}),
});

const CreateUserForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			MatricNumber: 123456,
			email: "",
			password: "",
		},
	});

	const handleShowPassword = () => {
		setShowPassword(() => !showPassword);
	};

	const onSubmit = () => {};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 w-full mx-auto"
			>
				<CustomFormField
					fieldType={FormFieldType.input}
					control={form.control}
					name="MatricNumber"
					label="Matric Number"
					placeholder="123456"
					type="number"
					inputMode="numeric"
					iconSrc={<MdNumbers />}
				/>

				<CustomFormField
					fieldType={FormFieldType.input}
					control={form.control}
					name="email"
					label="Email"
					placeholder="timely@example.com"
					type="email"
					iconSrc={<MdEmail />}
				/>
				<CustomFormField
					fieldType={FormFieldType.input}
					control={form.control}
					name="password"
					label="Create password"
					type={!showPassword ? "password" : "text"}
					isPasswordField={true}
					handleShowPassword={handleShowPassword}
					iconSrc={showPassword ? <FaEyeSlash /> : <FaEye />}
				/>
				<Button
					type="submit"
					className="w-full bg-green-400 font-inter font-bold cursor-pointer hover:bg-green-600"
				>
					Get Started
				</Button>
			</form>
		</Form>
	);
};

export default CreateUserForm;
