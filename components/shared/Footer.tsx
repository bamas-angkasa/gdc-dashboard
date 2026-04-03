import Link from "next/link";
import { Dictionary } from "@/lib/i18n";

interface FooterProps {
  dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-gray-900 text-sm">Green Days <span className="text-emerald-600">Wealth Club</span></span>
          <p className="text-xs text-gray-400 mt-1">{dict.footer.copy}</p>
        </div>
        <div className="flex items-center gap-5">
          {dict.footer.links.map((link) => (
            <Link key={link} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-wide">
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
