import "@/app/globals.css"
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";
import Footer from "@/components/generalComponents/Footer";
import Head from "next/head";

export const metadata = {
  title: "Skocoh",
  description: "Fast, easy networking for creators and entrepreneurs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Global SEO */}
        <title>Skocoh — Connect with creators and entrepreneurs</title>
        <meta
          name="description"
          content="Skocoh matches you into small, curated groups of creators and entrepreneurs to network fast, easy, and effectively."
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / social preview */}
        <meta property="og:title" content="Skocoh — Connect with creators and entrepreneurs" />
        <meta
          property="og:description"
          content="Join Skocoh to network with small, curated groups of creators and entrepreneurs."
        />
        <meta property="og:image" content="/social-preview.png" />
        <meta property="og:url" content="https://skocoh.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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
