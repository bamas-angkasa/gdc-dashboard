import { SavingsEntry } from "@/lib/data/users";
import { Dictionary } from "@/lib/i18n";

interface SavingsCardProps {
  savings: SavingsEntry[];
  dict: Dictionary;
}

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function SavingsCard({ savings, dict }: SavingsCardProps) {
  if (!savings || savings.length === 0) return null;

  const total = savings.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <div>
          <h3 className="font-bold text-gray-900">{dict.dashboard.savingsVelocity}</h3>
          <p className="text-xs text-gray-400">{dict.dashboard.monthlyContribution}</p>
        </div>
        <p className="font-black text-emerald-600 text-lg">{formatIDR(total)}</p>
      </div>

      {/* Bar chart visualization */}
      <div className="px-5 py-4">
        <div className="flex items-end gap-2 h-20">
          {savings.map((entry, i) => {
            const maxAmount = Math.max(...savings.map((s) => s.amount));
            const heightPct = (entry.amount / maxAmount) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-emerald-500 rounded-t-lg transition-all"
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-xs text-gray-400 truncate w-full text-center">
                  {entry.date.slice(5)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Entry list */}
      <div className="divide-y divide-gray-50 border-t border-gray-50">
        {savings.map((entry, i) => (
          <div key={i} className="px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{dict.dashboard.savings}</p>
                <p className="text-xs text-gray-400">{entry.date}</p>
              </div>
            </div>
            <p className="font-bold text-emerald-600">+{formatIDR(entry.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
