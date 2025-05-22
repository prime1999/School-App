import HomeSlider from "@/components/HomeSlider";

const page = () => {
	return (
		<main className="my-2">
			<HomeSlider />
			<div className="w-full h-12 bg-gray-700 rounded-md"></div>
			<div className="w-full h-48 bg-gray-700 rounded-md my-4"></div>
		</main>
	);
};

export default page;
