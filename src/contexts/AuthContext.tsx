import React from 'react';

// Minimal auth hook to satisfy pages during build.
// Replace with your real AuthContext implementation.
export const useAuth = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const isAuthenticated = !!token;
  return { isAuthenticated, token } as { isAuthenticated: boolean; token: string | null };
};

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
