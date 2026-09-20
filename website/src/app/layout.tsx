
import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL("https://ecomicroverse.bio"),

  title: "EcoMicroVerse | Connecting Microbial Knowledge",

  description:
    "An AI-powered research intelligence platform for bacteriophages, microbial ecology, methane-oxidising bacteria, metagenomics and bioinformatics.",

  openGraph: {
    title: "EcoMicroVerse",
    description: "Connecting Microbial Knowledge",
    url: "https://ecomicroverse.bio",
    siteName: "EcoMicroVerse",
    images: [
      {
        url: "/images/coming-soon-hero.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EcoMicroVerse",
    description: "Connecting Microbial Knowledge",
    images: ["/images/coming-soon-hero.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}