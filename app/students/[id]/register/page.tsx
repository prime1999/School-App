"use client";

import StudentForm from "@/components/forms/StudentForm";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { getCurrentUser } from "@/lib/slice/StudentSlice";
import { useRouter } from "next/navigation";

const page = () => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const pathname = usePathname();
	// get the pathname from the current url
	const paths = pathname.split("/");

	useEffect(() => {
		// function to check if the user has created an account
		const handleLoad = async () => {
			try {
				const student = await dispatch(getCurrentUser(paths[2])).unwrap();
				// if not then redirect back to the register page
				if (!student?.email || !student?.matricNumber) {
					router.push("/");
				}
			} catch (error) {
				console.error("Failed to load user:", error);
			}
		};

		handleLoad();
	}, []);
	return (
		<main className="flex justify-center items-center h-[100vh] w-[100vw]">
			<div className="flex w-full h-full mx-auto justify-between gap-4">
				<div className="w-full h-full flex items-center justify-center mb-4 lg:w-2/3 scrollable-div">
					{" "}
					<div className="w-full h-[100vh] p-4 mx-auto flex flex-col overflow-y-auto scrollable-div lg:w-11/12 lg:p-8 xl:w-9/12">
						<Logo />
						<div className="mt-8">
							<div className="mb-12">
								<h1 className="text-3xl font-inter font-semibold">
									Welcome 👋
								</h1>
								<p className="text-gray-400 text-sm mt-2">
									Let's know more about you.
								</p>
							</div>
							<StudentForm />
						</div>
						<p className="text-xs font-inter text-gray-400 font-semibold my-8">
							©timelycopyright
						</p>
					</div>
				</div>
				<div
					style={{
						backgroundImage: "url(/assets/images/inputProfile.jpg)",
						backgroundSize: "cover",
					}}
					className="h-[100vh] lg:w-1/3"
				></div>
			</div>
		</main>
	);
};

export default page;
