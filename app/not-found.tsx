import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <p className="text-6xl font-black text-emerald-600 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User tidak ditemukan</h1>
        <p className="text-gray-500 mb-8">Dashboard yang Anda cari tidak tersedia.</p>
        <Link
          href="/"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
