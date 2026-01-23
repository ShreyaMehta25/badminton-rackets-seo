"use client";

import { SortProvider } from "@/contexts/SortContext";

export default function RacketsLayout({
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
