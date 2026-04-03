import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon?: ReactNode;
  accent?: boolean;
  gainBadge?: "gain" | "loss";
}

export default function StatCard({ label, value, subtext, icon, accent, gainBadge }: StatCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        accent
          ? "bg-emerald-600 text-white"
          : "bg-white border border-gray-100 shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className={`text-xs font-semibold tracking-widest uppercase ${accent ? "text-emerald-100" : "text-gray-400"}`}>
          {label}
        </p>
        {icon && (
          <div className={`${accent ? "text-emerald-200" : "text-gray-400"}`}>
            {icon}
          </div>
        )}
      </div>
      <p className={`text-2xl font-black ${accent ? "text-white" : gainBadge === "gain" ? "text-emerald-600" : gainBadge === "loss" ? "text-rose-500" : "text-gray-900"}`}>
        {value}
      </p>
      {subtext && (
        <p className={`text-sm mt-1.5 ${
          accent
            ? "text-emerald-100"
            : gainBadge === "gain"
            ? "text-emerald-500"
            : gainBadge === "loss"
            ? "text-rose-400"
            : "text-gray-400"
        }`}>
          {subtext}
        </p>
      )}
    </div>
  );
}
