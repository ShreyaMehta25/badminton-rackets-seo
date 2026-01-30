"use client";

import { SortProvider } from "@/contexts/SortContext";

export default function StringsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SortProvider>
      {children}
    </SortProvider>
  );
}
