const layout = ({ children }: any) => {
	return (
		<main className="relative w-full h-[100vh] px-4 py-2">
			<div className="flex justify-between items-center">
				<div className="bg-gray-700 w-24 h-12 rounded-md"></div>
				<div className="w-12 h-12 rounded-full bg-gray-700"></div>
			</div>
			{children}
			<div className="fixed bottom-5 w-full h-12 bg-gray-700 rounded-md"></div>
		</main>
	);
};

export default layout;
