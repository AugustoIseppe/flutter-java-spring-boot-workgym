"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import {
  loginService,
  storeTokenInLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  getCurrentUserService,
  User,
} from "../services/authService";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (loginVal: string, passwordVal: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      setError(null);
      const storedToken = getTokenFromLocalStorage();
      if (storedToken) {
        setToken(storedToken);
        try {
          // Se temos um token, tentamos buscar os dados do usuário
          // O getCurrentUserService já usa o token do localStorage internamente
          const currentUser = await getCurrentUserService();
          setUser(currentUser);
        } catch (error) {
          console.error("Erro ao buscar usuário na inicialização:", error);
          // Token pode ser inválido/expirado, então limpamos
          removeTokenFromLocalStorage();
          setToken(null);
          setUser(null);
          Cookies.remove("jwtToken");
          // Poderia redirecionar para login aqui se a rota atual não for pública
          // router.push("/login-page");
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (loginVal: string, passwordVal: string) => {
    setIsLoading(true);
    try {
      const receivedToken = await loginService(loginVal, passwordVal);
      if (receivedToken) {
        storeTokenInLocalStorage(receivedToken);
        Cookies.set("jwtToken", receivedToken); // <-- define o token em um cookie acessível pelo middleware
        setToken(receivedToken);
        const currentUser = await getCurrentUserService();
        console.log("Usuário atual:", currentUser);
        setUser(currentUser);
        await router.push("/dashboard");
        // window.location.reload(); // força o estado atualizar
      } else {
        throw new Error("Token não recebido do serviço de login.");
      }
    } catch (error) {
      console.error("Falha no login (AuthContext):", error);
      setUser(null);
      setToken(null);
      removeTokenFromLocalStorage();
      Cookies.remove("jwtToken"); // Remove o cookie se falhar
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  
  const logout = () => {
    setIsLoading(true);
    removeTokenFromLocalStorage();
    Cookies.remove("jwtToken"); // Remove cookie do token
    setToken(null);
    setUser(null);
    router.push("/login-page");
    setIsLoading(false);
  };
  const fetchCurrentUser = async () => {
    if (token && !user) {
      // Só busca se tiver token e não tiver usuário (ou para refresh)
      setIsLoading(true);
      try {
        const currentUserData = await getCurrentUserService();
        setUser(currentUserData);
      } catch (error) {
        console.error("Erro ao buscar usuário (fetchCurrentUser):", error);
        // Se der erro (ex: token expirado), desloga
        logout();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        isAuthenticated: !!token && !!user, // Considera autenticado se tem token E usuário
        login,
        error,
        logout,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export default AuthContext;
