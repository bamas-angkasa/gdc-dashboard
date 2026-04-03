"use client";

import Link from "next/link";
import { Dictionary, Locale } from "@/lib/i18n";

interface NavbarProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Navbar({ dict, locale }: NavbarProps) {
  const otherLocale = locale === "id" ? "en" : "id";
  const switchHref = locale === "id" ? "/en" : "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={locale === "id" ? "/" : "/en"} className="font-bold text-gray-900 text-lg tracking-tight">
          Green Days <span className="text-emerald-600">Wealth Club</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm text-gray-600">
          <Link href="#services" className="hover:text-gray-900 transition-colors">{dict.nav.strategy}</Link>
          <Link href="#services" className="hover:text-gray-900 transition-colors">{dict.nav.assets}</Link>
          <Link href="#how-it-works" className="hover:text-gray-900 transition-colors">{dict.nav.market}</Link>
          <Link href="#how-it-works" className="hover:text-gray-900 transition-colors">{dict.nav.insights}</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors border border-gray-200 rounded-full px-3 py-1"
          >
            {otherLocale === "en" ? "EN" : "ID"}
          </Link>
          <Link
            href="#cta"
            className="hidden md:inline-flex text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            {dict.nav.consultation}
          </Link>
          <Link
            href="#cta"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            {dict.nav.accessPortal}
          </Link>
        </div>
      </nav>
    </header>
  );
}
