"use client";

import { SortProvider } from "@/contexts/SortContext";

export default function GripsLayout({
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
