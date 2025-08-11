import "@/app/globals.css"
import Header from "@/components/generalComponents/Header";
import Head from "../head";
import MobileNav from "@/components/generalComponents/MobileNav";
import Footer from "@/components/generalComponents/Footer";

export const metadata = {
  title: "BuilderSpace",
  description: "Fast, easy networking for creators and entrepreneurs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
        <body className="min-h-screen w-full mx-auto text-sm sm:text-base flex flex-col">
          <Header />
          <MobileNav />
          {children}
          <div className="flex-grow bg-slate-50"></div>
          <Footer />
        </body>
    </html>
  );
}
