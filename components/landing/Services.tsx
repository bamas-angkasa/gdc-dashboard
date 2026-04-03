import { Dictionary } from "@/lib/i18n";

const icons = [
  // Bank/institution
  <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 8h20L12 3zM4 10v8M8 10v8M12 10v8M16 10v8M20 10v8M2 18h20" />
  </svg>,
  // Chart
  <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
  </svg>,
  // Shield
  <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
];

interface ServicesProps {
  dict: Dictionary;
}

export default function Services({ dict }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">
            {dict.services.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
            {dict.services.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {dict.services.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                {icons[i]}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
              <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors flex items-center gap-1">
                {dict.services.learnMore}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
