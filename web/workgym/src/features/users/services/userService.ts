import { User, UserFormData, UserFormDataUpdate } from "../types";
const API_URL = "http://localhost:8080/users";

// url register 
const API_URL_REGISTER = "http://localhost:8080/auth/register";

export const fetchUsers = async (
  token: string | undefined
): Promise<User[]> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  return response.json();
};

export const createUser = async (
  userData: UserFormData,
  token: string | undefined
): Promise<User> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  try {
    const response = await fetch(API_URL_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Erro ao criar usuário");
    return response.json();
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw new Error(error?.toString());
  }
};

export const updateUser = async (
  id: string,
  userData: UserFormDataUpdate,
  token: string | undefined
): Promise<User> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Erro ao atualizar usuário");
  return response.json();
};

export const deleteUser = async (
  id: string,
  token: string | undefined
): Promise<void> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao excluir usuário");
};
