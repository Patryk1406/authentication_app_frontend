import React, {
  createContext, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  let timeoutId: number;

  const logOut = () => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    navigate('/login', {
      state: { loggedOut: true },
    });
  };

  const logIn = (newToken: string, expirationTime: number) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    localStorage.setItem('expirationTime', JSON.stringify(expirationTime));
    timeoutId = window.setTimeout(logOut, expirationTime - Date.now());
  };

  useEffect(() => {
    const JwtToken = localStorage.getItem('token');
    if (JwtToken) {
      const timeDifference = JSON.parse(localStorage.getItem('expirationTime') as string) - Date.now();
      if (timeDifference < 0) localStorage.clear();
      else {
        setToken(JwtToken);
        timeoutId = window.setTimeout(logOut, JSON.parse(localStorage.getItem('expirationTime') as string) - Date.now());
      }
    }
    return () => clearTimeout(timeoutId);
  }, []);

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
