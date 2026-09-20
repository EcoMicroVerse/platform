import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ecomicroverse.bio"),
  title: "EcoMicroVerse | Connecting Microbial Knowledge",
  description:
    "An AI-powered research intelligence platform for bacteriophages, microbial ecology, metagenomics, metatranscriptomics and bioinformatics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#07121f] text-white">
        {children}
      </body>
    </html>
  );
}