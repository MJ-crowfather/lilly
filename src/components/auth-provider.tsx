'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

const DEMO_EMAIL = 'user@zamp.ai';
const DEMO_PASSWORD = 'demo123';
const AUTH_KEY = 'app_is_authenticated';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_KEY);
      const isAuth = storedAuth === 'true';
      setIsAuthenticated(isAuth);
    } catch (e) {
      // localStorage is not available on the server
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && pathname !== '/login') {
        router.push('/login');
      } else if (isAuthenticated && pathname === '/login') {
        router.push('/');
      }
    }
  }, [isAuthenticated, loading, pathname, router]);

  const login = (email: string, pass: string) => {
    if (email === DEMO_EMAIL && pass === DEMO_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    // Redirect is handled by the effect
  };
  
  const value = { isAuthenticated, login, logout };

  if (loading) {
    return null; // Or a loading spinner
  }

  // Show login page without protection, or children if authenticated
  if (!isAuthenticated && pathname !== '/login') {
    return null; // Redirecting...
  }
  
  if (isAuthenticated && pathname === '/login') {
      return null; // Redirecting...
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
