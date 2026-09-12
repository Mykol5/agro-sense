 "use client";

import Link from "next/link";
import { Leaf, Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ["/features", "Features"],
    ["/impact", "Impact"],
    ["/about", "About"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f5ee]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0d5b36] text-white">
            <Leaf size={19} />
          </span>
          <span className="font-bold tracking-[-.04em]">
            AgroSense <span className="text-[#0d5b36]">AI</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-8 lg:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="text-sm text-black/55 hover:text-[#0d5b36]">
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-8">
          <Link href="/login" className="hidden rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium md:block">
            Sign in
          </Link>
          <Link href="/dashboard" className="flex items-center gap-1.5 rounded-full bg-[#0d5b36] px-4 py-2 text-sm font-semibold text-white">
            Open AgroSense <ArrowUpRight size={15} />
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-[#f7f5ee] p-4 lg:hidden">
          {links.map(([href, label]) => (
            <Link onClick={() => setOpen(false)} key={href} href={href} className="block rounded-xl px-4 py-3 text-sm hover:bg-white">
              {label}
            </Link>
          ))}
          <Link onClick={() => setOpen(false)} href="/login" className="block rounded-xl px-4 py-3 text-sm hover:bg-white">
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
}
