'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117]/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/images/tappy-logo-dark.png" alt="Tappy" width={96} height={27} priority />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#8B949E]">
          <Link href="#" className="hover:text-white transition-colors">Product</Link>
          <Link href="#" className="hover:text-white transition-colors">Solutions ↓</Link>
          <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#" className="hover:text-white transition-colors">About us</Link>
          <Link href="#" className="hover:text-white transition-colors">Support</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/portal" className="text-sm text-[#8B949E] hover:text-white transition-colors">
            Login
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold bg-[#C6FF3B] text-[#0D1117] px-5 py-2 rounded-full hover:bg-[#d4ff5a] transition-colors"
          >
            Get started
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0D1117] border-t border-white/5 px-6 py-4 flex flex-col gap-4 text-sm">
          <Link href="#" className="text-[#8B949E] hover:text-white">Product</Link>
          <Link href="#" className="text-[#8B949E] hover:text-white">Solutions</Link>
          <Link href="#" className="text-[#8B949E] hover:text-white">Pricing</Link>
          <Link href="#" className="text-[#8B949E] hover:text-white">About us</Link>
          <Link href="#" className="text-[#8B949E] hover:text-white">Support</Link>
          <Link href="/portal" className="text-[#8B949E] hover:text-white">Login</Link>
          <Link href="#" className="font-semibold bg-[#C6FF3B] text-[#0D1117] px-5 py-2 rounded-full text-center">
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
}
