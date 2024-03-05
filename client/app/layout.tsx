import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from '../app/context/userContext'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Vote",
  description: "Attomo Games Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </UserContextProvider>
  );
}