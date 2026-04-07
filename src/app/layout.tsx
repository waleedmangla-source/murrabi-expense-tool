import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MurrabiOS",
  description: "Mac Desktop App for Murrabiyan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="h-full flex flex-col bg-zinc-950 text-white overflow-hidden">
        {/* Mac Titlebar drag region */}
        <div className="h-8 w-full drag-region absolute top-0 left-0 z-50"></div>
        
        <div className="flex h-full w-full pt-8">
          <div className="no-drag h-full">
            <Sidebar />
          </div>
          <main className="flex-1 overflow-y-auto no-drag bg-zinc-950 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
