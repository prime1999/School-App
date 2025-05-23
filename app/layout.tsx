import type { Metadata } from "next";
import { Big_Shoulders_Stencil_Text, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/lib/Provider";
import MobileNav from "@/components/MobileNav";

const bigShoulder = Big_Shoulders_Stencil_Text({
	variable: "--font-big-shoulder-stencil",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Timely",
	description:
		"An app to create handle the class time-table and Exam Schedules",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Providers>
				<body
					className={`${bigShoulder.variable} ${inter.variable} antialiased`}
				>
					<ThemeProvider attribute="class" defaultTheme="dark">
						{children}
						<MobileNav />
					</ThemeProvider>
				</body>
			</Providers>
		</html>
	);
}
