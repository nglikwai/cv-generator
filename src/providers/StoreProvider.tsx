'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

const StoreContext = createContext<null | {
  readOnly: boolean;
  setReadOnly: (value: boolean) => void;
  error: boolean;
  setError: (value: boolean) => void;
  parsedCvData: any | null;
  setParsedCvData: (data: any | null) => void;
  parseClData: any | null;
  setParseClData: (data: any | null) => void;
  loginOpen: boolean;
  setLoginOpen: (value: boolean) => void;
  user: string | null;
  setUser: (value: string | null) => void;
}>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [readOnly, setReadOnly] = useState(false);
  const [parsedCvData, setParsedCvData] = useState<any | null>(null);
  const [parseClData, setParseClData] = useState<any | null>(null);
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
        parsedCvData,
        setParsedCvData,
        parseClData,
        setParseClData,
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
