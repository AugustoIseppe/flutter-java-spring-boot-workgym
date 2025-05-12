"use client";
import Pagina from "@/components/template/Pagina";
import Image from "next/image";

import { useAuth } from "@/app/authContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { token } = useAuth();
 
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || !isAuthenticated) {
    return <div>Carregando...</div>;
  }

  return (
    <Pagina>
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-zinc-950">Dashboard</h1>
          <p className="text-lg text-zinc-950">Bem-vindo ao seu painel!</p>
          <Image
            src={"/workgym-logo.png"}
            alt="Explorador"
            width={200}
            height={200}
            className="mt-4"
          />
          
        </div>
      </div>
    </Pagina>
  );
}
