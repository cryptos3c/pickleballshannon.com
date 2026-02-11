import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shannon Kuhlman | 5.0+ Pickleball Pro Coach - Twin Cities",
  description:
    "Elevate your pickleball game with Shannon Kuhlman, a 5.0+ rated pro coach serving the Twin Cities. Private lessons, group clinics, video analysis, and tournament prep for all skill levels.",
  keywords:
    "pickleball coach Twin Cities, pickleball lessons Minneapolis, pickleball pro coach, private pickleball lessons, pickleball clinics Minnesota, 5.0 pickleball coach",
  openGraph: {
    title: "Shannon Kuhlman | 5.0+ Pickleball Pro Coach",
    description:
      "Private lessons, group clinics, video analysis, and tournament coaching from a 5.0+ rated pro in the Twin Cities.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
