"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Cart from "./Cart";
import CategoriesBar from "./CategoriesMenu";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {

  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
  if (!search.trim()) return;
  router.push(`/search?query=${encodeURIComponent(search)}`);
  setSearch("");
};

  return (
    <>
      {/* BARRA SUPERIOR */}
      <header className="bg-gray-800 text-white shadow-lg fixed top-0 w-full z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src="/logo.png" className="h-12 w-auto" />
            </Link>
            <span className="hidden md:block font-bold text-lg uppercase text-white tracking-wide">
              O'Brian Autopeças
            </span>
          </div>

          {/* Barra de busca */}
          <div className="flex items-center bg-[#1a1c22] rounded-full px-4 py-2 shadow-inner border border-gray-700">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="bg-transparent w-48 md:w-64 outline-none text-sm text-gray-200 placeholder-gray-500"
            />

            <button
              onClick={handleSearch}
              className="ml-3 text-gray-400 hover:text-orange-400 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" strokeWidth="2"
                stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </button>
          </div>

          {/* Ícones */}
          <div className="flex items-center gap-5">
            <Cart />
            <div className="h-5 w-[1px] bg-gray-700" />

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-3 py-1 border rounded-md border-gray-600 hover:bg-gray-700 transition text-sm">
                  Fazer Login
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* BARRA INFERIOR COM ÍCONES (CATEGORIAS) */}
      <div className="fixed top-[68px] w-full z-40 bg-gray-800">
        <CategoriesBar />
      </div>
    </>
  );
}