import Navbar from "@/components/Navbar";

const layout = ({ children }: any) => {
	return (
		<main className="relative w-full h-[100vh] px-4 py-2">
			<Navbar />
			{children}
			<div className="fixed bottom-5 w-full h-12 bg-gray-700 rounded-md"></div>
		</main>
	);
};

export default layout;
