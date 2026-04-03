import Link from "next/link";
import { Dictionary, Locale } from "@/lib/i18n";

interface HeroProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-6 tracking-widest">
            {dict.hero.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            {dict.hero.title}{" "}
            <span className="text-emerald-600 italic">{dict.hero.titleHighlight}</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
            {dict.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#dashboard"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-emerald-200"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href="#how-it-works"
              className="border border-gray-200 text-gray-700 hover:border-gray-300 font-medium px-6 py-3 rounded-full transition-colors"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Card */}
        <div className="relative">
          <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl shadow-gray-200">
            {/* Mini chart bars */}
            <div className="mb-4">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Portfolio Performance</p>
              <div className="flex items-end gap-1 h-16">
                {[40, 55, 45, 60, 50, 70, 65, 80, 72, 88, 78, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-emerald-500/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            {/* Yield badge */}
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Portfolio Yield</p>
                <p className="text-2xl font-black text-emerald-600">+12.4%</p>
              </div>
              <svg className="w-16 h-10 text-emerald-500" viewBox="0 0 64 40" fill="none">
                <path d="M2 35 L16 22 L28 28 L44 10 L62 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
          </div>
          {/* Decorative blur */}
          <div className="absolute -z-10 top-8 right-8 w-48 h-48 bg-emerald-300/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
