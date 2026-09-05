import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = "Sydrick Wu — Economics, Endurance & Technology";
const description = "Sydrick Wu’s interactive 3D portfolio across economics, technology and endurance sport.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sydrick-wu.github.io"),
  title,
  description,
  alternates: { canonical: "/portfolio/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/portfolio/",
    images: [{ url: "/portfolio/og.jpg", width: 1200, height: 675, alt: "Sydrick Wu interactive 3D portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
