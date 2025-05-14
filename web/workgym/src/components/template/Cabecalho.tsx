"use client";

import { IconLogout } from "@tabler/icons-react";
import React, { useContext } from "react";
import AuthContext from "@/app/authContext";
import Image from "next/image";

export default function Cabecalho() {
  const auth = useContext(AuthContext); // ✅ dentro do componente
  const logout = auth?.logout;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logout?.(); // Protege com optional chaining
    } catch (err) {
      console.error("Falha ao fazer logout:", err);
    }
  };

  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-zinc-100 via-white to-zinc-100 border-b px-6 py-3 gap-2 ">
      <div className="flex items-center justify-center w-15 h-15 bg-black rounded-full">
        <Image src={"/workgym-logo.png"} alt="Logo" width={50} height={50} />
      </div>
      <span className="font-bold text-zinc-950 text-2xl">
        WorkGym - Portal de Gerenciamento da Academia
      </span>

      <div className="flex items-center gap-2">
        <span className="text-zinc-950 text-sm font-extrabold">
          {auth?.user?.login} - {auth?.user?.role} 
        </span>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className=" text-white px-4 py-1 rounded hover:bg-cyan-800 transition duration-200"
          >
          <IconLogout size={30} stroke={1.5} color="black" />
        </button>
      </form>
          </div>
    </header>
  );
}
