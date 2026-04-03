import Link from "next/link";
import { UserData, GOLD_PRICE_PER_GRAM } from "@/lib/data/users";
import { Dictionary, Locale } from "@/lib/i18n";
import StatCard from "./StatCard";
import TradingCard from "./TradingCard";
import AssetsCard from "./AssetsCard";
import SavingsCard from "./SavingsCard";

interface DashboardViewProps {
  user: UserData;
  username: string;
  dict: Dictionary;
  locale: Locale;
}

const WalletIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3m18-3V6" />
  </svg>
);

const ChartIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
  </svg>
);

const CashIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  </svg>
);

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatUSDT(amount: number, currency = "USDT"): string {
  return `${amount.toLocaleString()} ${currency}`;
}

export default function DashboardView({ user, username, dict, locale }: DashboardViewProps) {
  const today = new Date().toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const switchHref =
    locale === "id" ? `/en/${username}` : `/${username}`;

  // Calculate summary figures
  const goldCurrentValue = (user.assets ?? []).reduce((s, a) => s + a.grams * GOLD_PRICE_PER_GRAM, 0);
  const goldBuyTotal = (user.assets ?? []).reduce((s, a) => s + a.buyPriceTotal, 0);
  const goldGain = goldCurrentValue - goldBuyTotal;
  const goldGainPct = goldBuyTotal > 0 ? (goldGain / goldBuyTotal) * 100 : 0;
  const hasGold = (user.assets ?? []).length > 0;

  const totalSavings = (user.savings ?? []).reduce((s, sv) => s + sv.amount, 0);

  const totalTradingProfit = (user.trading ?? []).reduce((s, t) => s + t.profit, 0);
  const hasTrading = (user.trading ?? []).length > 0;
  const tradingCurrency = user.trading?.[0]?.currency ?? "USDT";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">Green Days <span className="text-emerald-600">Wealth Club</span></p>
            <p className="text-xs text-gray-400">{dict.dashboard.premiumTier}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={switchHref}
              className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-500 hover:text-gray-800 transition-colors"
            >
              {locale === "id" ? "EN" : "ID"}
            </Link>
            <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-6 space-y-5">
        {/* User Header */}
        <div>
          <h1 className="text-2xl font-black text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-400">
            {dict.dashboard.portfolioOverview} &bull; {today}
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4">
          {/* Total aset emas (nilai sekarang) */}
          {hasGold && (
            <StatCard
              label={dict.dashboard.totalAssets}
              value={formatIDR(goldCurrentValue)}
              subtext={`${dict.dashboard.goldPnL}: ${goldGain >= 0 ? "+" : ""}${formatIDR(goldGain)} (${goldGain >= 0 ? "+" : ""}${goldGainPct.toFixed(1)}%)`}
              icon={WalletIcon}
              accent
            />
          )}

          {/* P&L Emas */}
          {hasGold && (
            <StatCard
              label={dict.dashboard.goldPnLLabel}
              value={`${goldGain >= 0 ? "+" : ""}${formatIDR(goldGain)}`}
              subtext={`${goldGainPct >= 0 ? "▲" : "▼"} ${Math.abs(goldGainPct).toFixed(1)}% ${locale === "id" ? "dari harga beli" : "from buy price"}`}
              icon={WalletIcon}
              gainBadge={goldGain >= 0 ? "gain" : "loss"}
            />
          )}

          {/* P&L Trading */}
          {hasTrading && (
            <StatCard
              label={dict.dashboard.tradingPnLLabel}
              value={`+${formatUSDT(totalTradingProfit, tradingCurrency)}`}
              subtext={dict.dashboard.realizedUnrealized}
              icon={ChartIcon}
              gainBadge="gain"
            />
          )}

          {totalSavings > 0 && (
            <StatCard
              label={dict.dashboard.savings}
              value={formatIDR(totalSavings)}
              subtext={`+${(user.savings?.length ?? 0)} ${locale === "id" ? "transaksi" : "transactions"}`}
              icon={CashIcon}
            />
          )}
        </div>

        {/* Asset Cards */}
        {(user.assets ?? []).length > 0 && (
          <AssetsCard assets={user.assets!} dict={dict} />
        )}

        {/* Trading Card */}
        {hasTrading && (
          <TradingCard trading={user.trading!} dict={dict} />
        )}

        {/* Savings Card */}
        {(user.savings ?? []).length > 0 && (
          <SavingsCard savings={user.savings!} dict={dict} />
        )}

        {/* Empty state */}
        {!hasGold && !totalSavings && !hasTrading && (
          <div className="text-center py-16 text-gray-400">
            <p>{dict.dashboard.noData}</p>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-5 h-16 flex items-center justify-around">
          {[
            {
              label: locale === "id" ? "Ikhtisar" : "Overview",
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              ),
              active: true,
            },
            {
              label: locale === "id" ? "Portofolio" : "Portfolio",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
              ),
              active: false,
            },
            {
              label: locale === "id" ? "Dokumen" : "Documents",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              ),
              active: false,
            },
            {
              label: locale === "id" ? "Pengaturan" : "Settings",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              active: false,
            },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-1 ${
                item.active ? "text-emerald-600" : "text-gray-400"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      {/* Spacer for bottom nav */}
      <div className="h-20" />
    </div>
  );
}
