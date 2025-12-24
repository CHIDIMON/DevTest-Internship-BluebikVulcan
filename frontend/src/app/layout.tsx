//layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import Geist and Geist Mono fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
//define metadata for the application
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
//export metadata object
export const metadata: Metadata = {
  title: "Transaction History",
  description: "Bluebik Vulcan Internal System",
};
//define RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}