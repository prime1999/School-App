"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaSearch } from "react-icons/fa";
import { AppDispatch } from "@/lib/store";
import { getCurrentUser } from "@/lib/slice/StudentSlice";
import Logo from "./Logo";
import { Input } from "./ui/input";

const Navbar = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const { isLoading, student } = useSelector((state: any) => state.student);
	console.log(student);
	const pathname = usePathname();
	// get the pathname from the current url
	const paths = pathname.split("/");
	useEffect(() => {
		const handleLoad = async () => {
			try {
				const student = await dispatch(getCurrentUser(paths[2])).unwrap();
				// if not then redirect back to the register page
				if (!student || !student?.email || !student?.matricNumber) {
					router.push("/logIn");
				}
			} catch (error) {
				console.error("Failed to load user:", error);
			}
		};
		handleLoad();
	}, []);
	return (
		<nav className="">
			<div className="flex items-center justify-between p-4">
				{" "}
				<Logo />
				<div>
					<FaBell className="text-green-400 text-2xl w-12 cursor-pointer" />
				</div>
			</div>
			{/* <div className="relative">
				<Input
					type="text"
					placeholder="Search..."
					className="border border-slate-500 rounded-md p-2 w-full pl-8"
				/>
				<FaSearch className="absolute top-3 left-3 text-green-300" />
			</div> */}
		</nav>
	);
};

export default Navbar;
