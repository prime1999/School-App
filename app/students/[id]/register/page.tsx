import Logo from "@/components/Logo";
import Image from "next/image";

const page = () => {
	return (
		<main className="flex justify-center items-center h-[100vh] w-[100vw]">
			<div className="flex w-full h-full mx-auto justify-between gap-4">
				<div className="w-full h-full flex items-center justify-center lg:w-1/2">
					{" "}
					<div className="w-10/12 mx-auto flex flex-col lg:w-9/12 xl:w-7/12">
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
							{/* <CreateUserForm /> */}
						</div>
						<p className="text-xs font-inter text-gray-400 font-semibold mt-8">
							©timelycopyright
						</p>
					</div>
				</div>
				<div
					style={{
						backgroundImage: "url(/assets/images/inputProfile.jpg)",
						backgroundSize: "cover",
					}}
					className="w-1/3 h-[100vh]"
				></div>
			</div>
		</main>
	);
};

export default page;
