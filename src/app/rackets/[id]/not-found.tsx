import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold">Racket Not Found</h1>
        <p className="text-slate-400">
          The racket you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/rackets"
          className="inline-block px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition"
        >
          Browse All Rackets
        </Link>
      </div>
    </main>
  );
}
