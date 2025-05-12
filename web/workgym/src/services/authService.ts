"use client";

import axios from "axios";

const API_URL = "http://localhost:8080";

interface LoginResponse {
  token: string;
}

// Conforme o UserDTO do backend
export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  login: string;
  role: string; // ADMIN ou USER
}

export const loginService = async (login: string, password: string): Promise<string | null> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/auth/login`,
      {
        login,
        password,
      }
    );
    if (response.data && response.data.token) {
        console.log("Token recebido:", response.data.token);
      return response.data.token;
    }
    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Erro no login:", error.response.data);
      // Tenta pegar uma mensagem de erro mais específica do backend, se houver
      const message = typeof error.response.data === 'string' ? error.response.data : (error.response.data as any)?.message || "Login ou senha inválidos.";
      throw new Error(message);
    }
    console.error("Erro inesperado no login:", error);
    throw new Error("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
  }
};

export const storeTokenInLocalStorage = (token: string): void => {
  localStorage.setItem("jwtToken", token);
};

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("jwtToken");
};

export const removeTokenFromLocalStorage = (): void => {
  localStorage.removeItem("jwtToken");
};

// Função para buscar os dados do usuário logado
export const getCurrentUserService = async (): Promise<User | null> => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.log("Nenhum token encontrado para buscar usuário.");
    return null;
  }

  try {
    const response = await axios.get<User>(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Erro ao buscar usuário:", error.response.data);
      if (error.response.status === 401 || error.response.status === 403) {
        // Token inválido ou expirado, bom lugar para limpar o token local
        removeTokenFromLocalStorage();
        console.log("Token inválido ou expirado, removido do localStorage.");
      }
      throw new Error(error.response.data.message || "Não foi possível buscar os dados do usuário.");
    }
    console.error("Erro inesperado ao buscar usuário:", error);
    throw new Error("Ocorreu um erro ao buscar os dados do usuário.");
  }
};

// Exemplo de como configurar uma instância do axios para incluir o token automaticamente
const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
  
