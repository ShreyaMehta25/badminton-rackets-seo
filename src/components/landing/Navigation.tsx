"use client";

import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="text-emerald-600">
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
          <div className="hidden md:block">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">SmashSelect</h2>
            <p className="text-xs text-slate-500">Badminton Rackets</p>
          </div>
        </Link>

        <div className="flex-1 max-w-2xl">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
