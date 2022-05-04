import React, {
  createContext, ReactNode, useMemo, useState,
} from 'react';

export interface IAuthContext {
  token: string;
  logOutHandler: () => void
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  const [token, setToken] = useState<string>('');

  const logOutHandler = () => {
    setToken('');
  };

  const contextValue: IAuthContext = useMemo(() => ({
    token,
    logOutHandler,
  }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
