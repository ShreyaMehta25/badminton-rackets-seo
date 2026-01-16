"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="text-slate-500">
            <svg
              className="size-6"
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
          <h2 className="text-lg font-bold text-slate-400 tracking-tight">
            SmashSelect
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
          <Link
            href="/rackets"
            className="hover:text-emerald-400 transition-colors"
          >
            Discover
          </Link>
          <Link
            href="/players"
            className="hover:text-emerald-400 transition-colors"
          >
            Pro Gears
          </Link>
          <Link
            href="/rackets"
            className="hover:text-emerald-400 transition-colors"
          >
            Compare
          </Link>
        </div>
        <p className="text-sm text-slate-600">
          © 2024 SmashSelect Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
