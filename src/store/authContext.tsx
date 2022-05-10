import React, {
  createContext, ReactNode, useEffect, useMemo, useState,
} from 'react';

export interface IAuthContext {
  token: string;
  logIn: (newToken: string, expirationTime: number) => void
  logOut: () => void
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  const [token, setToken] = useState<string>('');
  let timeoutId: number;

  useEffect(() => {
    const JwtToken = localStorage.getItem('token');
    if (JwtToken) {
      const timeDifference = JSON.parse(localStorage.getItem('expirationTime') as string) - Date.now();
      if (timeDifference < 0) localStorage.clear();
      else {
        setToken(JwtToken);
        timeoutId = window.setTimeout(() => localStorage.clear(), JSON.parse(localStorage.getItem('expirationTime') as string) - Date.now());
      }
    }
    return () => clearTimeout(timeoutId);
  }, []);

  const logOut = () => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  };

  const logIn = (newToken: string, expirationTime: number) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    localStorage.setItem('expirationTime', JSON.stringify(expirationTime));
    timeoutId = window.setTimeout(() => {
      setToken('');
      localStorage.clear();
    }, 10000);
  };

  const contextValue: IAuthContext = useMemo(() => ({
    token,
    logIn,
    logOut,
  }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
