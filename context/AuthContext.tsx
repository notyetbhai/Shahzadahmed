import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        // Optional: redirect to login if session is lost
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (password: string): Promise<boolean> => {
    // For this portfolio, we'll use a single admin email.
    // Ideally, this should be an email input, but to keep the UI simple as per the existing design (password only),
    // we will hardcode the admin email.
    const email = 'admin@shahzadportfolio.com';

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login failed:', error.message);
      return false;
    }

    navigate('/admin/dashboard');
    return true;
  }, [navigate]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
