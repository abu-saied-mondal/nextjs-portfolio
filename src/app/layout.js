import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevSki | Full-Stack Software Engineer & Creative Developer",
  description: "Personal portfolio showcasing high-performance full-stack web applications, smooth user experiences, and interactive front-end animations. Built with Next.js, Tailwind CSS v4, GSAP, and Framer Motion.",
  keywords: ["Full Stack Developer", "Software Engineer", "Next.js Portfolio", "React Developer", "GSAP Animations", "Tailwind CSS v4"],
  authors: [{ name: "DevSki" }],
  openGraph: {
    title: "DevSki | Full-Stack Software Engineer & Creative Developer",
    description: "Sleek, high-performance portfolio featuring full-stack development, modern web layouts, and interactive animations.",
    url: "https://devski-portfolio.vercel.app/",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${geistMono.variable} font-sans antialiased bg-brand-bg text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
