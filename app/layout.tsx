import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Vaisag J | Cybersecurity & Full Stack Developer",
  description: "Portfolio of Vaisag J - Cybersecurity specialist and full-stack developer building secure MERN applications",
  keywords: "cybersecurity, full stack developer, MERN, portfolio, web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${jetbrainsMono.variable}`}>
      <body className="font-mono bg-[var(--background)] text-[var(--foreground)] antialiased crt-overlay min-h-screen flex flex-col relative selection:bg-primary selection:text-black">
        <Navbar />
        <main className="flex-grow z-10 relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
