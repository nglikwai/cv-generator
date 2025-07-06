'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const StoreContext = createContext<null | {
  readOnly: boolean;
  setReadOnly: (value: boolean) => void;
  error: boolean;
  setError: (value: boolean) => void;
  parsedData: any | null;
  setParsedData: (data: any | null) => void;
  loginOpen: boolean;
  setLoginOpen: (value: boolean) => void;
  user: string | null;
  setUser: (value: string | null) => void;
}>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [readOnly, setReadOnly] = useState(false);
  const [parsedData, setParsedData] = useState<any | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  return (
    <StoreContext
      value={{
        readOnly,
        setReadOnly,
        error,
        setError,
        parsedData,
        setParsedData,
        loginOpen,
        setLoginOpen,
        user,
        setUser,
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
