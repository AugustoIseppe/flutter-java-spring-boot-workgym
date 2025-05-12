"use client";
import AuthContext from "@/app/authContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState, useContext } from "react";

const LoginPage: React.FC = () => {
  const [loginValue, setLoginValue] = useState(""); // Alterado de email para loginValue
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const router = useRouter();

  if (!auth) {
    // Idealmente, você teria um estado de erro global ou um componente de erro
    return <p>Erro: Contexto de autenticação não encontrado.</p>;
  }

  const { login, isLoading, error } = auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginValue, password); // Usando loginValue aqui
      // router.push("/dashboard"); // Exemplo de redirecionamento
    } catch (err) {
      // Erros já são tratados e exibidos pelo AuthContext, mas você pode adicionar lógica específica aqui
      console.error("Falha no login:", err);
    }
  };

  return (
    <div className="flex flex-row bg-white mx-auto w-full h-screen justify-around items-center ">
      <div className="flex flex-col items-center justify-center min-h-screen flex-1">
        <Image
          src={"/WORK.png"}
          alt="Explorador"
          width={400}
          height={400}
          className=""
        />
        <h1 className="text-4xl font-bold mb-4 text-zinc-950">
          Bem-vindo ao WorkGym
        </h1>
        <p className="text-lg text-zinc-950">
          Sua jornada de trabalho começa aqui!
        </p>
      </div>

      {/* Formulário de Login */}
      <div className="flex flex-col items-center justify-center min-h-screen flex-1 bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-md w-96 flex flex-col items-center text-center ">
          <h1 className="text-zinc-950 text-5xl mb-4">Login</h1>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4 text-left">
              <label htmlFor="login" className="text-zinc-950">
                Login:
              </label>
              <input
                type="text"
                id="login"
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                required
                className="border p-2 rounded text-black w-full"
              />
            </div>
            <div className="mb-4 text-left">
              <label htmlFor="password" className="text-zinc-950">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 rounded text-black w-full"
              />
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 w-full"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
