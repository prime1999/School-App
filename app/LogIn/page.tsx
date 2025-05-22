"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { UserSchema } from "@/lib/Validation";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { MdNumbers } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SubmitButton from "@/lib/utils/SubmitButton";
import Logo from "@/components/Logo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { authUser, getCurrentSession } from "@/lib/slice/AuthSlice";
import { useRouter } from "next/navigation";
import { getDocuments } from "@/lib/slice/StudentSlice";

const page = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			MatricNumber: "" as any,
			password: "",
		},
	});

	useEffect(() => {
		const checkSession = async () => {
			try {
				const session = await dispatch(getCurrentSession()).unwrap();
				console.log(session && session.$id);
				// if a session already exists
				if (session && session.status == true) {
					// redirect the student to his/her dashboard
					router.push(`/students/${session.$id}/dashboard`);
				}
			} catch (error) {
				console.log(error);
			}
		};
		checkSession();
		// if(session && session?.status === true )
	}, []);

	const handleShowPassword = () => {
		setShowPassword(() => !showPassword);
	};

	// function to handle the form submittion
	const onSubmit = async (values: z.infer<any>) => {
		try {
			// function to check if the matric number has already created an account
			const res = await dispatch(getDocuments(values.MatricNumber)).unwrap();
			console.log(res);
			if (res && res.documents) {
				// get the email from the document and also the password from the form values
				const userData = {
					email: res.documents[0].Email,
					password: values.password,
				};
				// dispatch the function to authenticate the user
				const logInRes = (await dispatch(authUser(userData))) as any;
				console.log(logInRes && logInRes?.payload?.student?.id);
				// redirect the user if the authentication is successful
				if (logInRes && logInRes.payload?.student?.id) {
					router.push(`students/${logInRes?.payload?.student?.id}/dashboard`);
				}
			}
			// TODO
		} catch (error) {
			toast.error("Wrong User Credentials", {
				style: { border: "red" },
			});
			console.log(error);
		}
	};
	return (
		<main className="w-full h-[100vh] flex items-center justify-center">
			<div className="relative w-[400px] border border-gray-800 rounded-lg px-6 pb-12 pt-24 overflow-hidden">
				<Image
					src="/assets/images/Notebook-bro.png"
					width={250}
					height={250}
					alt="writing image"
					className="absolute -top-30 -z-50"
				/>
				<Logo />
				<div className="mb-12">
					<h1 className="text-3xl font-inter font-semibold">Hi there 👋</h1>
					<p className="text-gray-400 text-sm mt-2">
						Time to check your schedule.
					</p>
				</div>
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
							name="password"
							label="Create password"
							type={!showPassword ? "password" : "text"}
							isPasswordField={true}
							handleShowPassword={handleShowPassword}
							iconSrc={showPassword ? <FaEyeSlash /> : <FaEye />}
						/>
						<SubmitButton
							isLoading={false}
							className="w-full bg-green-400 text-black rounded-lg font-inter font-bold"
						>
							Get Started
						</SubmitButton>
					</form>
				</Form>
				<div className="flex justify-center items-center gap-2 text-sm mt-4 font-inter">
					<h4>Don't have an Account?</h4>
					<Link
						href="/"
						className="font-semibold duration-500 hover:text-green-500"
					>
						Register
					</Link>
				</div>
				<p className="text-xs font-inter text-center text-gray-400 font-semibold mt-4">
					©timelycopyright
				</p>
			</div>
			<Toaster />
		</main>
	);
};

export default page;
