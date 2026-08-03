import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = "Sydrick Wu — Economics, Endurance & Technology";
const description =
  "The personal portfolio of Sydrick Wu, an economics graduate student, technology operator and endurance athlete.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "http://localhost:3000";
  const socialImage = new URL("/og.png", origin).toString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: socialImage, width: 1674, height: 941, alt: "Sydrick Wu portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
