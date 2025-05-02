import CreateUserForm from "@/components/forms/CreateUserForm";
import Logo from "@/components/Logo";
import Image from "next/image";

const page = () => {
	return (
		<main className="w-[100vw] h-[100vh] flex items-center justify-between">
			<div className="w-full h-full flex items-center justify-center lg:w-1/2">
				<div className="w-10/12 mx-auto flex flex-col lg:w-9/12 xl:w-7/12">
					<Logo />
					<div className="mt-8">
						<div className="mb-12">
							<h1 className="text-3xl font-inter font-semibold">Hi there 👋</h1>
							<p className="text-gray-400 text-sm mt-2">
								Get started with updates.
							</p>
						</div>
						<CreateUserForm />
					</div>
					<p className="text-xs font-inter text-gray-400 font-semibold mt-8">
						©timelycopyright
					</p>
				</div>
			</div>
			<div className="hidden w-1/2 h-full lg:block">
				<Image
					src="/assets/images/getStarted.jpg"
					alt="student-image"
					width={200}
					height={200}
					className="object-cover w-full h-full"
				/>
			</div>
		</main>
	);
};

export default page;
