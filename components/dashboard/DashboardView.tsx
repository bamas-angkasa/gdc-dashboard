"use client";

import { useState } from "react";
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

type Tab = "overview" | "portfolio" | "documents" | "settings";

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

function formatCurrency(amount: number, currency = "IDR"): string {
  if (currency === "IDR") return formatIDR(amount);
  return `${amount.toLocaleString()} ${currency}`;
}

function formatUSDT(amount: number, currency = "USDT"): string {
  if (currency === "IDR") return formatIDR(amount);
  return `${amount.toLocaleString()} ${currency}`;
}

export default function DashboardView({ user, username, dict, locale }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const today = new Date().toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const switchHref = locale === "id" ? `/en/${username}` : `/${username}`;

  // Calculate summary figures
  const goldCurrentValue = (user.assets ?? []).reduce((s, a) => s + a.grams * GOLD_PRICE_PER_GRAM, 0);
  const goldBuyTotal = (user.assets ?? []).reduce((s, a) => s + a.buyPriceTotal, 0);
  const goldGain = goldCurrentValue - goldBuyTotal;
  const goldGainPct = goldBuyTotal > 0 ? (goldGain / goldBuyTotal) * 100 : 0;
  const hasGold = (user.assets ?? []).length > 0;

  const savingsIDR = (user.savings ?? []).filter(s => !s.currency || s.currency === "IDR");
  const totalSavingsIDR = savingsIDR.reduce((s, sv) => s + sv.amount, 0);
  const totalSavings = (user.savings ?? []).reduce((s, sv) => s + sv.amount, 0);

  const totalTradingProfit = (user.trading ?? []).reduce((s, t) => s + t.profit, 0);
  const hasTrading = (user.trading ?? []).length > 0;
  const tradingCurrency = user.trading?.[0]?.currency ?? "USDT";

  const tabs = [
    {
      id: "overview" as Tab,
      label: locale === "id" ? "Ikhtisar" : "Overview",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      ),
    },
    {
      id: "portfolio" as Tab,
      label: locale === "id" ? "Portofolio" : "Portfolio",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
        </svg>
      ),
    },
    {
      id: "documents" as Tab,
      label: locale === "id" ? "Dokumen" : "Documents",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      id: "settings" as Tab,
      label: locale === "id" ? "Pengaturan" : "Settings",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

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
            {activeTab === "overview"
              ? `${dict.dashboard.portfolioOverview} \u2022 ${today}`
              : activeTab === "portfolio"
              ? (locale === "id" ? "Rincian Portofolio" : "Portfolio Detail")
              : activeTab === "documents"
              ? (locale === "id" ? "Dokumen & Keanggotaan" : "Documents & Membership")
              : (locale === "id" ? "Pengaturan Akun" : "Account Settings")}
          </p>
        </div>

        {/* === IKHTISAR === */}
        {activeTab === "overview" && (
          <>
            <div className="grid gap-4">
              {hasGold && (
                <StatCard
                  label={dict.dashboard.totalAssets}
                  value={formatIDR(goldCurrentValue)}
                  subtext={`${dict.dashboard.goldPnL}: ${goldGain >= 0 ? "+" : ""}${formatIDR(goldGain)} (${goldGain >= 0 ? "+" : ""}${goldGainPct.toFixed(1)}%)`}
                  icon={WalletIcon}
                  accent
                />
              )}

              {hasGold && (
                <StatCard
                  label={dict.dashboard.goldPnLLabel}
                  value={`${goldGain >= 0 ? "+" : ""}${formatIDR(goldGain)}`}
                  subtext={`${goldGainPct >= 0 ? "▲" : "▼"} ${Math.abs(goldGainPct).toFixed(1)}% ${locale === "id" ? "dari harga beli" : "from buy price"}`}
                  icon={WalletIcon}
                  gainBadge={goldGain >= 0 ? "gain" : "loss"}
                />
              )}

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
                  value={formatIDR(totalSavingsIDR)}
                  subtext={`+${(user.savings?.length ?? 0)} ${locale === "id" ? "transaksi" : "transactions"}`}
                  icon={CashIcon}
                />
              )}
            </div>

            {(user.assets ?? []).length > 0 && (
              <AssetsCard assets={user.assets!} dict={dict} />
            )}

            {hasTrading && (
              <TradingCard trading={user.trading!} dict={dict} />
            )}

            {(user.savings ?? []).length > 0 && (
              <SavingsCard savings={user.savings!} dict={dict} />
            )}

            {!hasGold && !totalSavings && !hasTrading && (
              <div className="text-center py-16 text-gray-400">
                <p>{dict.dashboard.noData}</p>
              </div>
            )}
          </>
        )}

        {/* === PORTOFOLIO === */}
        {activeTab === "portfolio" && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-emerald-600 rounded-2xl p-5 text-white">
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-100 mb-1">
                {locale === "id" ? "Total Portofolio" : "Total Portfolio"}
              </p>
              <p className="text-3xl font-black">
                {formatIDR(
                  goldCurrentValue +
                  totalSavingsIDR +
                  (user.trading ?? []).filter(t => t.currency === "IDR").reduce((s, t) => s + t.profit, 0)
                )}
              </p>
              <p className="text-xs text-emerald-100 mt-1">
                {locale === "id" ? `Diperbarui: ${today}` : `Updated: ${today}`}
              </p>
            </div>

            {/* Tabungan Section */}
            {(user.savings ?? []).length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                  <div>
                    <h3 className="font-bold text-gray-900">{dict.dashboard.savings}</h3>
                    <p className="text-xs text-gray-400">{(user.savings ?? []).length} {locale === "id" ? "entri" : "entries"}</p>
                  </div>
                  <p className="font-black text-emerald-600">{formatIDR(totalSavingsIDR)}</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {(user.savings ?? []).map((entry, i) => (
                    <div key={i} className="px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{locale === "id" ? "Setoran Tabungan" : "Savings Deposit"}</p>
                          <p className="text-xs text-gray-400">{entry.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">
                          +{formatCurrency(entry.amount, entry.currency ?? "IDR")}
                        </p>
                        {entry.currency && entry.currency !== "IDR" && (
                          <p className="text-[10px] text-gray-400">{entry.currency}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trading Section */}
            {hasTrading && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                  <div>
                    <h3 className="font-bold text-gray-900">{dict.dashboard.trading}</h3>
                    <p className="text-xs text-gray-400">{(user.trading ?? []).length} {locale === "id" ? "posisi" : "positions"}</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    +{formatCurrency(totalTradingProfit, tradingCurrency)}
                  </span>
                </div>
                <div className="divide-y divide-gray-50">
                  {(user.trading ?? []).map((entry, i) => (
                    <div key={i} className="px-5 py-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{entry.platform}</span>
                            {entry.instrument !== "-" && (
                              <span className="text-xs font-semibold text-gray-600">{entry.instrument}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{entry.date}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${entry.position === "Short" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}>
                          {entry.position}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-gray-50 rounded-xl p-3">
                          <p className="text-[10px] text-gray-400 mb-0.5 uppercase tracking-wide">{dict.dashboard.capital}</p>
                          <p className="text-sm font-bold text-gray-900">{formatCurrency(entry.capital, entry.currency)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                          <p className="text-[10px] text-gray-400 mb-0.5 uppercase tracking-wide">{dict.dashboard.profit}</p>
                          <p className="text-sm font-bold text-emerald-600">+{formatCurrency(entry.profit, entry.currency)}</p>
                        </div>
                        <div className="bg-emerald-50 rounded-xl p-3">
                          <p className="text-[10px] text-emerald-600/70 mb-0.5 uppercase tracking-wide">ROI</p>
                          <p className="text-sm font-bold text-emerald-600">+{entry.profitPercent}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gold Section */}
            {hasGold && (
              <AssetsCard assets={user.assets!} dict={dict} />
            )}

            {!hasGold && !totalSavings && !hasTrading && (
              <div className="text-center py-16 text-gray-400">
                <p>{dict.dashboard.noData}</p>
              </div>
            )}
          </div>
        )}

        {/* === DOKUMEN === */}
        {activeTab === "documents" && (
          <div className="space-y-4">
            {/* Member Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
              <div className="relative">
                <p className="text-xs font-semibold tracking-widest text-emerald-200 uppercase mb-3">
                  Green Days Wealth Club
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-black text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-lg leading-tight">{user.name}</p>
                    <p className="text-xs text-emerald-200">@{username}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-emerald-200 uppercase tracking-wide">{locale === "id" ? "Tier Keanggotaan" : "Membership Tier"}</p>
                    <p className="text-sm font-bold">{dict.dashboard.premiumTier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-emerald-200 uppercase tracking-wide">{locale === "id" ? "Bergabung" : "Member Since"}</p>
                    <p className="text-sm font-bold">2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Document List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h3 className="font-bold text-gray-900">{locale === "id" ? "Dokumen Keanggotaan" : "Membership Documents"}</h3>
                <p className="text-xs text-gray-400">{locale === "id" ? "Dokumen resmi Anda" : "Your official documents"}</p>
              </div>
              {[
                {
                  title: locale === "id" ? "Perjanjian Keanggotaan" : "Membership Agreement",
                  desc: locale === "id" ? "Syarat & ketentuan keanggotaan" : "Terms & conditions of membership",
                  status: locale === "id" ? "Aktif" : "Active",
                  date: "2026-03-01",
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  ),
                },
                {
                  title: locale === "id" ? "Kebijakan Privasi" : "Privacy Policy",
                  desc: locale === "id" ? "Penggunaan data & informasi pribadi" : "Data usage & personal information",
                  status: locale === "id" ? "Tersedia" : "Available",
                  date: "2026-03-01",
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                },
                {
                  title: locale === "id" ? "Laporan Portofolio" : "Portfolio Report",
                  desc: locale === "id" ? "Ringkasan kinerja investasi" : "Investment performance summary",
                  status: locale === "id" ? "Tersedia" : "Available",
                  date: today,
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  ),
                },
              ].map((doc, i) => (
                <div key={i} className="px-5 py-4 flex items-center gap-4 border-b border-gray-50 last:border-0">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    {doc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{doc.title}</p>
                    <p className="text-xs text-gray-400">{doc.desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h3 className="font-bold text-gray-900">{locale === "id" ? "Aktivitas Akun" : "Account Activity"}</h3>
              </div>
              {[
                { label: locale === "id" ? "Setoran Tabungan" : "Savings Deposit", date: "2026-04-03", amount: "+Rp500.000" },
                { label: locale === "id" ? "Masuk ke Trading" : "Trading Entry", date: "2026-04-03", amount: "Rp1.000.000" },
                { label: locale === "id" ? "Setoran Tabungan" : "Savings Deposit", date: "2026-03-27", amount: "+Rp1.000.000" },
              ].map((item, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-700">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === PENGATURAN === */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            {/* Profile */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-gray-900 text-lg">{user.name}</p>
                  <p className="text-sm text-gray-400">@{username}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 mt-1 inline-block">
                    {dict.dashboard.premiumTier}
                  </span>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h3 className="font-bold text-gray-900">{locale === "id" ? "Preferensi" : "Preferences"}</h3>
              </div>
              {[
                {
                  label: locale === "id" ? "Bahasa" : "Language",
                  value: locale === "id" ? "Bahasa Indonesia" : "English",
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                    </svg>
                  ),
                },
                {
                  label: locale === "id" ? "Mata Uang Tampilan" : "Display Currency",
                  value: "IDR (Rp)",
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  label: locale === "id" ? "Notifikasi" : "Notifications",
                  value: locale === "id" ? "Aktif" : "Enabled",
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="px-5 py-4 flex items-center gap-4 border-b border-gray-50 last:border-0">
                  <div className="w-9 h-9 bg-gray-50 text-gray-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <span className="text-sm">{item.value}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h3 className="font-bold text-gray-900">{locale === "id" ? "Informasi Akun" : "Account Info"}</h3>
              </div>
              {[
                { label: locale === "id" ? "Nama Lengkap" : "Full Name", value: user.name },
                { label: "Username", value: `@${username}` },
                { label: locale === "id" ? "Keanggotaan" : "Membership", value: dict.dashboard.premiumTier },
                { label: locale === "id" ? "Status" : "Status", value: locale === "id" ? "Aktif" : "Active" },
              ].map((item, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between border-b border-gray-50 last:border-0">
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Switch Language */}
            <Link
              href={switchHref}
              className="block w-full bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 text-center text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors"
            >
              {locale === "id" ? "Ganti ke English" : "Switch to Bahasa Indonesia"}
            </Link>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-5 h-16 flex items-center justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === tab.id ? "text-emerald-600" : "text-gray-400"
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
      {/* Spacer for bottom nav */}
      <div className="h-20" />
    </div>
  );
}
