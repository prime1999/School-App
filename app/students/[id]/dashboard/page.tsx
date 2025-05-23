import HomeSlider from "@/components/HomeSlider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FacultyTable from "@/components/tables/faculty/facultyTable";

const page = () => {
	return (
		<main className="my-2">
			<div
				className="relative w-full h-[400px]"
				style={{
					backgroundImage: 'url("/assets/images/hero.jpg")',
					backgroundSize: "cover",
				}}
			>
				<div
					className="absolute top-0 left-0 w-full h-full flex justify-center items-center lg:justify-end"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				>
					<div className="hidden text-center leading-tight uppercase font-extrabold tracking-tight mr-16 lg:block">
						<h2 className="text-sm text-gray-500">It's Time To</h2>
						<h1 className="text-5xl sm:text-6xl text-green-500">Organize</h1>
						<h1 className="text-5xl sm:text-6xl text-gray-900">Plan</h1>
						<h1 className="text-3xl sm:text-4xl text-green-500">
							Your Timetable
						</h1>
						<p className="text-sm mt-2 text-gray-400 lowercase italic">
							with ease & clarity!
						</p>
					</div>
					<div className="text-center leading-tight uppercase font-extrabold tracking-tight lg:hidden">
						<h2 className="text-sm text-gray-300">It's Time To</h2>
						<h1 className="text-5xl sm:text-6xl text-green-500">Organize</h1>
						<h1 className="text-5xl sm:text-6xl text-gray-400">Plan</h1>
						<h1 className="text-3xl sm:text-4xl text-green-500">
							Your Timetable
						</h1>
						<p className="text-md mt-2 text-gray-200 lowercase italic">
							with ease & clarity!
						</p>
					</div>
				</div>
			</div>
			<HomeSlider />
			<div className="w-11/12 mx-auto">
				<Tabs defaultValue="faculty" className="">
					<TabsList>
						<TabsTrigger value="faculty">Faculty</TabsTrigger>
						<TabsTrigger value="department">Department</TabsTrigger>
					</TabsList>
					<TabsContent value="faculty">
						<FacultyTable />
					</TabsContent>
					<TabsContent value="department">
						Make changes to your account here.
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
};

export default page;
