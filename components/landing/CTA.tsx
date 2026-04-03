import { Dictionary } from "@/lib/i18n";

interface CTAProps {
  dict: Dictionary;
}

export default function CTA({ dict }: CTAProps) {
  return (
    <section id="cta" className="py-24 bg-gray-900">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          {dict.cta.title}
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-8">
          {dict.cta.subtitle}
        </p>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg shadow-lg shadow-emerald-900/50">
          {dict.cta.button}
        </button>
      </div>
    </section>
  );
}
