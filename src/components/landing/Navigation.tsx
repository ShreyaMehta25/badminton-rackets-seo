"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/70 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-emerald-400">
            <svg
              className="size-8"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight">SmashSelect</h2>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/rackets"
            className="text-sm font-medium hover:text-emerald-400 transition-colors"
          >
            Discover
          </Link>
          <Link
            href="/players"
            className="text-sm font-medium hover:text-emerald-400 transition-colors"
          >
            Pro Gears
          </Link>
          <Link
            href="/rackets"
            className="text-sm font-medium hover:text-emerald-400 transition-colors"
          >
            Compare
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/rackets"
            className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold h-11 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
