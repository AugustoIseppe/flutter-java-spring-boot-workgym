"use client";
import AuthContext from "@/app/authContext";
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
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
