"use client";

import { SortProvider } from "@/contexts/SortContext";

export default function ShuttlecockLayout({
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
