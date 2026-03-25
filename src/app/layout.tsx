import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yachtworx — Smart Yacht Management",
    template: "%s | Yachtworx",
  },
  description:
    "The all-in-one platform for yacht owners and marine mechanics. Manage maintenance, find trusted service providers, and protect your fleet.",
  keywords: ["yacht management", "boat maintenance", "marine mechanics", "yacht service"],
  openGraph: {
    title: "Yachtworx — Smart Yacht Management",
    description:
      "The all-in-one platform for yacht owners and marine mechanics.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
