'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const StoreContext = createContext<null | {
  readOnly: boolean;
  setReadOnly: (value: boolean) => void;
  error: boolean;
  setError: (value: boolean) => void;
}>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [readOnly, setReadOnly] = useState(false);
  const [error, setError] = useState(false);
  return (
    <StoreContext
      value={{
        readOnly,
        setReadOnly,
        error,
        setError,
      }}
    >
      {children}
    </StoreContext>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
