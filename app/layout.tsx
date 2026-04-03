import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Days Wealth Club",
  description: "Track, manage, and grow your finances with data-driven insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className={`${geist.className} min-h-full bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
