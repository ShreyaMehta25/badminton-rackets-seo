"use client";

import { SortProvider } from "@/contexts/SortContext";

export default function ShoesLayout({
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
