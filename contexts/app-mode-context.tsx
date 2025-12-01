import React, { createContext, useContext, useState } from 'react';

type AppMode = 'buyer' | 'seller';

interface AppModeContextType {
  mode: AppMode;
  toggleMode: () => void;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export function AppModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AppMode>('buyer');

  const toggleMode = () => {
    setMode(prev => prev === 'buyer' ? 'seller' : 'buyer');
  };

  return (
    <AppModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </AppModeContext.Provider>
  );
}

export function useAppMode() {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error('useAppMode must be used within AppModeProvider');
  }
  return context;
}
