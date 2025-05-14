import { Exercise, ExerciseFormData } from "../types";

const API_URL = "http://localhost:8080/exercises";

export const fetchExercises = async (token: string | undefined): Promise<Exercise[]> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar exercícios");
  return res.json();
};

export const createExercise = async (exerciseData: ExerciseFormData, token: string | undefined): Promise<Exercise> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(exerciseData),
  });
  if (!response.ok) throw new Error("Erro ao criar exercício");
  return response.json();
};

export const updateExercise = async (id: string, exerciseData: ExerciseFormData, token: string | undefined): Promise<Exercise> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(exerciseData),
  });
  if (!response.ok) throw new Error("Erro ao atualizar exercício");
  return response.json();
};

export const deleteExercise = async (id: string, token: string | undefined): Promise<void> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao excluir exercício");
};

