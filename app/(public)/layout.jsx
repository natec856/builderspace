import "@/app/globals.css"
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";
import Footer from "@/components/generalComponents/Footer";

export const metadata = {
  title: "Skocoh — Connect with creators and entrepreneurs",
  description:
    "Skocoh matches you into small, curated groups of creators and entrepreneurs to network fast, easy, and effectively.",
  metadataBase: new URL("https://skocoh.com"),
  openGraph: {
    title: "Skocoh — Connect with creators and entrepreneurs",
    description:
      "Join Skocoh to network with small, curated groups of creators and entrepreneurs.",
    url: "https://skocoh.com",
    siteName: "Skocoh",
    images: ["/social-preview.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skocoh — Connect with creators and entrepreneurs",
    description:
      "Join Skocoh to network with small, curated groups of creators and entrepreneurs.",
    images: ["/social-preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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