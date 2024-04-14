'use client';

import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

type DomContextType = {
  sliderRef: RefObject<HTMLDivElement>;
  tileRef: RefObject<HTMLDivElement>;
  paginationButtonRef: RefObject<HTMLButtonElement>;
} | null;

export const DomContext = createContext<DomContextType>(null);

export const DomContextProvider = ({ children }: { children: ReactNode }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);
  const paginationButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <DomContext.Provider
      value={{
        sliderRef,
        tileRef,
        paginationButtonRef,
      }}
    >
      {children}
    </DomContext.Provider>
  );
};

export const useDomContext = () => {
  const context = useContext(DomContext);
  if (!context) throw new Error('useDomContext must be used within a RefContextProvider');
  return context;
};
