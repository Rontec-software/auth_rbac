'use client';

import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getToken } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkSession = () => {
      const tokenPayload = getToken();

      if (tokenPayload) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkSession();
  }, [getToken, router]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
