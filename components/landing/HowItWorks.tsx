import { Dictionary } from "@/lib/i18n";

interface HowItWorksProps {
  dict: Dictionary;
}

export default function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Steps */}
        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">
            {dict.howItWorks.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-10">
            {dict.howItWorks.title}
          </h2>

          <div className="space-y-8">
            {dict.howItWorks.steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-emerald-500 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 aspect-[4/3] flex items-center justify-center shadow-2xl shadow-gray-200">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/20 rounded-2xl" />
          </div>
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-lg">Your Wealth Dashboard</p>
            <p className="text-gray-400 text-sm mt-1">Secure · Personal · Real-time</p>
          </div>
        </div>
      </div>
    </section>
  );
}
