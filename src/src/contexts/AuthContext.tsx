import React, { useEffect, useState, createContext, useContext } from 'react';
import { User, Role } from '../types';
import { MOCK_USERS } from '../utils/mockData';
import { useToast } from './ToastContext';
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: Role | Role[]) => boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    addToast
  } = useToast();
  useEffect(() => {
    // Simulate checking local storage
    const storedUser = localStorage.getItem('devnexus_admin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('devnexus_admin_user', JSON.stringify(foundUser));
      addToast(`Welcome back, ${foundUser.name}`, 'success');
    } else {
      // For demo purposes, if email not found, login as Super Admin
      const demoUser = MOCK_USERS[0];
      setUser(demoUser);
      localStorage.setItem('devnexus_admin_user', JSON.stringify(demoUser));
      addToast('Demo Mode: Logged in as Super Admin', 'info');
    }
    setIsLoading(false);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('devnexus_admin_user');
    addToast('Logged out successfully', 'info');
  };
  const hasRole = (role: Role | Role[]) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };
  return <AuthContext.Provider value={{
    user,
    isLoading,
    login,
    logout,
    hasRole
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}