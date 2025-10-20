import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

interface RoleContextType {
  hasRole: (roles: string | string[]) => boolean;
  isSuperAdmin: boolean;
  isKeuangan: boolean;
  isUser: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

interface RoleProviderProps {
  children: React.ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const { user } = useAuth();

  const hasRole = (roles: string | string[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const isSuperAdmin = user?.role === 'super_admin';
  const isKeuangan = user?.role === 'keuangan';
  const isUser = user?.role === 'user';

  const value = {
    hasRole,
    isSuperAdmin,
    isKeuangan,
    isUser,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
