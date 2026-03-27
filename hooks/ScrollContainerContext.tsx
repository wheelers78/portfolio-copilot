import React, { createContext, useContext, ReactNode } from 'react';

interface ScrollContainerContextType {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollContainerContext = createContext<ScrollContainerContextType | null>(null);

export function ScrollContainerProvider({
  children,
  scrollContainerRef,
}: {
  children: ReactNode;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <ScrollContainerContext.Provider value={{ scrollContainerRef }}>
      {children}
    </ScrollContainerContext.Provider>
  );
}

export function useScrollContainer() {
  const context = useContext(ScrollContainerContext);
  return context?.scrollContainerRef || null;
}
