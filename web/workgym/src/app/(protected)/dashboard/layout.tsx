// src/app/(protected)/layout.tsx
"use client";
import { useAuth } from '@/app/authContext';
// import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect('/login-page'); // Usando a nova função redirect
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || !isAuthenticated) {
    return <div>Verificando autenticação...</div>;
  }

  return <>{children}</>;
}