import "@/app/globals.css"
import Head from "@/app/head";
import Footer from "@/components/generalComponents/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optional for performance
  variable: "--font-inter", // Optional: makes it easier to use with Tailwind
});

export const metadata = {
  title: "Skocoh",
  description: "Fast, easy networking for creators and entrepreneurs",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en" className="{inter.variable}">
      <Head />
      <body className="min-h-screen w-full mx-auto text-sm sm:text-base flex flex-col ">
        {children}
        <div className="flex-grow bg-slate-50"></div>
        <Footer />
      </body>
    </html>
  );
}