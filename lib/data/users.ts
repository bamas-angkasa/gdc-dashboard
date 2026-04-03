export const GOLD_PRICE_PER_GRAM = 2_700_000; // harga emas saat ini per gram (IDR)

export interface GoldAsset {
  type: string;
  grams: number;
  buyPriceTotal: number; // total harga beli (IDR)
}

export interface TradingEntry {
  platform: string;
  capital: number;
  date: string;
  instrument: string;
  position: string;
  profitPercent: number;
  profit: number;
  currency: string;
}

export interface SavingsEntry {
  amount: number;
  date: string;
  currency?: string;
}

export interface UserData {
  name: string;
  assets?: GoldAsset[];
  trading?: TradingEntry[];
  savings?: SavingsEntry[];
}

export const users: Record<string, UserData> = {
  adikurniawan1: {
    name: "Adi Kurniawan",
    assets: [
      {
        type: "Tabungan Emas",
        grams: 15,
        buyPriceTotal: 37_500_000,
      },
    ],
    trading: [
      {
        platform: "Prop Firm",
        capital: 1000,
        date: "2026-03-26",
        instrument: "ETH",
        position: "Short",
        profitPercent: 245,
        profit: 105,
        currency: "USDT",
      },
    ],
  },
  sultonubaidillah: {
    name: "Sulton Ubaidillah",
    savings: [
      {
        amount: 1_000_000,
        date: "2026-03-27",
        currency: "IDR",
      },
      {
        amount: 500_000,
        date: "2026-04-03",
        currency: "IDR",
      },
    ],
    trading: [
      {
        platform: "Trading",
        capital: 1_000_000,
        date: "2026-04-03",
        instrument: "-",
        position: "Long",
        profitPercent: 20,
        profit: 200_000,
        currency: "IDR",
      },
    ],
  },
};

export function getUser(username: string): UserData | null {
  return users[username.toLowerCase()] ?? null;
}
