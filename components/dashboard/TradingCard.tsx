import { TradingEntry } from "@/lib/data/users";
import { Dictionary } from "@/lib/i18n";

interface TradingCardProps {
  trading: TradingEntry[];
  dict: Dictionary;
}

export default function TradingCard({ trading, dict }: TradingCardProps) {
  if (!trading || trading.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <h3 className="font-bold text-gray-900">{dict.dashboard.trading}</h3>
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
        </svg>
      </div>

      <div className="divide-y divide-gray-50">
        {trading.map((entry, i) => (
          <div key={i} className="px-5 py-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {entry.platform}
                </span>
                <p className="font-bold text-gray-900 mt-1">{entry.instrument}</p>
                <p className="text-xs text-gray-400">{entry.date}</p>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    entry.position === "Short"
                      ? "bg-rose-50 text-rose-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {entry.position}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">{dict.dashboard.capital}</p>
                <p className="font-bold text-gray-900">{entry.capital} <span className="text-xs font-normal text-gray-500">{entry.currency}</span></p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">{dict.dashboard.profit}</p>
                <p className="font-bold text-emerald-600">+{entry.profit} <span className="text-xs font-normal text-gray-500">{entry.currency}</span></p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-xs text-emerald-600/70 mb-0.5">ROI</p>
                <p className="font-bold text-emerald-600">+{entry.profitPercent}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
