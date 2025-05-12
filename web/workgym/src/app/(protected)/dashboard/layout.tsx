// src/app/(protected)/layout.tsx
"use client";
import { useAuth } from '@/app/authContext';
import { Inter } from 'next/font/google';
// import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

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