import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import Hydrate from "./components/Hydrate";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "O’Brian Autopeças",
  description: "Peças automotivas com qualidade e confiança",
  icons: { icon: "/logo.png" }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-br">
      <body className={clsx(inter.className, "bg-slate-700")}>
        <ClerkProvider>
          <Hydrate>
            <Navbar />
            <main className="min-h-screen bg-white pt-24 p-6">
              {children}
            </main>
          </Hydrate>
        </ClerkProvider>
      </body>
    </html>
  );
}