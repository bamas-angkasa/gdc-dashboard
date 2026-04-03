import { GoldAsset, GOLD_PRICE_PER_GRAM } from "@/lib/data/users";
import { Dictionary } from "@/lib/i18n";

interface AssetsCardProps {
  assets: GoldAsset[];
  dict: Dictionary;
}

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Fake historical price per gram (IDR ribu) dari beli → sekarang, untuk sparkline
const SPARKLINE_PRICES = [2500, 2510, 2490, 2525, 2545, 2560, 2540, 2590, 2630, 2660, 2680, 2700];

function Sparkline() {
  const min = Math.min(...SPARKLINE_PRICES);
  const max = Math.max(...SPARKLINE_PRICES);
  const w = 80;
  const h = 32;
  const pad = 2;

  const points = SPARKLINE_PRICES.map((p, i) => {
    const x = pad + (i / (SPARKLINE_PRICES.length - 1)) * (w - pad * 2);
    const y = pad + ((max - p) / (max - min)) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");

  const lastX = pad + ((SPARKLINE_PRICES.length - 1) / (SPARKLINE_PRICES.length - 1)) * (w - pad * 2);
  const lastY = pad + ((max - SPARKLINE_PRICES[SPARKLINE_PRICES.length - 1]) / (max - min)) * (h - pad * 2);

  // Area fill path
  const areaPoints = `${pad},${h} ${points} ${lastX},${h}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polygon points={areaPoints} fill="rgb(16 185 129 / 0.12)" />
      <polyline points={points} stroke="rgb(16 185 129)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Dot at end */}
      <circle cx={lastX} cy={lastY} r="2.5" fill="rgb(16 185 129)" />
    </svg>
  );
}

export default function AssetsCard({ assets, dict }: AssetsCardProps) {
  if (!assets || assets.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <h3 className="font-bold text-gray-900">{dict.dashboard.assetAllocation}</h3>
        <button className="text-xs font-semibold text-emerald-600 tracking-wide">{dict.dashboard.details}</button>
      </div>

      <div className="divide-y divide-gray-50">
        {assets.map((asset, i) => {
          const currentValue = asset.grams * GOLD_PRICE_PER_GRAM;
          const gainIDR = currentValue - asset.buyPriceTotal;
          const gainPct = (gainIDR / asset.buyPriceTotal) * 100;
          const buyPricePerGram = asset.buyPriceTotal / asset.grams;
          const isGain = gainIDR >= 0;

          return (
            <div key={i} className="px-5 py-4">
              {/* Header row */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900 text-sm">{asset.type}</p>
                    {/* Gain badge */}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isGain ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                      {isGain ? "▲" : "▼"} {Math.abs(gainPct).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{asset.grams} gram</p>
                </div>
                {/* Sparkline */}
                <Sparkline />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 mb-0.5 uppercase tracking-wide">{dict.dashboard.buyPrice}/gr</p>
                  <p className="text-xs font-bold text-gray-700">{formatIDR(buyPricePerGram)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 mb-0.5 uppercase tracking-wide">{dict.dashboard.currentPrice}/gr</p>
                  <p className="text-xs font-bold text-gray-700">{formatIDR(GOLD_PRICE_PER_GRAM)}</p>
                </div>
                <div className={`rounded-xl p-3 ${isGain ? "bg-emerald-50" : "bg-rose-50"}`}>
                  <p className={`text-[10px] mb-0.5 uppercase tracking-wide ${isGain ? "text-emerald-600/70" : "text-rose-600/70"}`}>{dict.dashboard.goldPnL}</p>
                  <p className={`text-xs font-bold ${isGain ? "text-emerald-600" : "text-rose-600"}`}>
                    {isGain ? "+" : ""}{formatIDR(gainIDR)}
                  </p>
                </div>
              </div>

              {/* Current value row */}
              <div className="mt-2 flex items-center justify-between bg-amber-50/50 rounded-xl px-3 py-2.5">
                <p className="text-xs text-gray-500">{dict.dashboard.currentValue}</p>
                <p className="font-black text-gray-900">{formatIDR(currentValue)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
