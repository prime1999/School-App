import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";

const layout = ({ children }: any) => {
	return (
		<>
			<main className="relative w-full h-[100vh]">
				<Navbar />
				{children}
			</main>
			<MobileNav />
		</>
	);
};

export default layout;
