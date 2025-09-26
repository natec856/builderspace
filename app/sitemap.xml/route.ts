import { NextResponse } from "next/server";

export async function GET() {
  const urls = [
    { loc: "https://skocoh.com/", lastmod: new Date().toISOString() },
    // Add other important pages here as you build them:
    // { loc: "https://skocoh.com/waitlist", lastmod: new Date().toISOString() },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
