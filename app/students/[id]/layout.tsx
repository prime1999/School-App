import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

const layout = ({ children }: any) => {
	return (
		<>
			<main className="relative w-full h-[100vh]">
				<Navbar />
				{children}
				<Footer />
			</main>
			<MobileNav />
		</>
	);
};

export default layout;
