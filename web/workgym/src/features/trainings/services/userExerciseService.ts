import { UserExercise, UserExerciseFormData, ApiUserExerciseItem, Exercise, User } from "../types";

const API_URL = "http://localhost:8080/user-exercises";
const USERS_API_URL = "http://localhost:8080/users";
const EXERCISES_API_URL = "http://localhost:8080/exercises";

export const fetchUsers = async (token: string | undefined): Promise<User[]> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(USERS_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  return response.json();
};

export const fetchExercises = async (token: string | undefined): Promise<Exercise[]> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(EXERCISES_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao buscar exercícios");
  return response.json();
};

export const fetchUserExercises = async (
  userId: string,
  token: string | undefined,
  exercises: Exercise[],
  users: User[]
): Promise<UserExercise[]> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  if (!userId) throw new Error("ID do usuário não fornecido.");
  
  const response = await fetch(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    console.error(
      "Erro ao buscar treinos do usuário - Status:",
      response.status,
      "Detalhes:",
      errorData
    );
    throw new Error(`Erro ao buscar treinos do usuário: ${response.statusText}`);
  }
  
  const dataFromApi: ApiUserExerciseItem[] = await response.json();
  
  return transformApiData(dataFromApi, userId, exercises, users);
};

export const createUserExercise = async (
  exerciseData: UserExerciseFormData,
  token: string | undefined
): Promise<UserExercise> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(exerciseData),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao cadastrar treino");
  }
  
  return response.json();
};

export const updateUserExercise = async (
  id: string,
  exerciseData: UserExerciseFormData,
  token: string | undefined
): Promise<UserExercise> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(exerciseData),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao atualizar treino");
  }
  
  return response.json();
};

export const deleteUserExercise = async (
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
  
  if (!response.ok) throw new Error("Erro ao excluir treino");
};

// Função auxiliar para transformar dados da API no formato esperado pelo frontend
const transformApiData = (
  apiData: ApiUserExerciseItem[],
  userId: string,
  exercises: Exercise[],
  users: User[]
): UserExercise[] => {
  return apiData.map((apiItem, index) => {
    const relatedExercise = exercises.find((ex) =>
      apiItem.exerciseId
        ? ex.id === apiItem.exerciseId
        : ex.name === apiItem.name
    );

    const currentUser = users.find((u) => u.id === userId);

    return {
      id:
        apiItem.id ||
        `user-exercise-${userId}-${
          relatedExercise?.id || apiItem.name
        }-${index}`,
      userId: userId,
      exerciseId: relatedExercise?.id || "",
      weekDay: apiItem.weekDay,
      series: apiItem.series,
      repetitions: apiItem.repetitions,
      observation: apiItem.observation,
      exercise: {
        id: relatedExercise?.id || "",
        name: relatedExercise?.name || apiItem.name,
        description: relatedExercise?.description || apiItem.description,
        image: relatedExercise?.image || apiItem.image,
      },
      user: {
        id: userId,
        name: currentUser?.name || "Usuário não encontrado",
      },
    };
  });
};
