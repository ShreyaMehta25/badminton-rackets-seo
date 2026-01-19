"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SortOption = "low-to-high" | "high-to-low";

interface SortContextType {
  sortOrder: SortOption;
  setSortOrder: (order: SortOption) => void;
}

const SortContext = createContext<SortContextType | undefined>(undefined);

export function SortProvider({ children }: { children: ReactNode }) {
  const [sortOrder, setSortOrder] = useState<SortOption>("low-to-high");

  return (
    <SortContext.Provider value={{ sortOrder, setSortOrder }}>
      {children}
    </SortContext.Provider>
  );
}

export function useSort() {
  const context = useContext(SortContext);
  if (context === undefined) {
    throw new Error("useSort must be used within a SortProvider");
  }
  return context;
}
