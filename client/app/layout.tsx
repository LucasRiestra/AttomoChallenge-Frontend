import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { UserContextProvider } from '../app/context/userContext'; 
import { UserProvider } from "@auth0/nextjs-auth0/client";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <UserProvider>
    <UserContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </UserContextProvider>
    </UserProvider>
  );
}