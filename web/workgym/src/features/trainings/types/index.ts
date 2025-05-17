export interface User {
  id: string;
  name: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface UserExercise {
  id: string;
  userId: string;
  exerciseId: string;
  weekDay: string;
  series: number;
  repetitions: number;
  observation: string;
  exercise: Exercise;
  user: User;
}

export interface ApiUserExerciseItem {
  id?: string;
  exerciseId?: string;
  name: string;
  description: string;
  image: string;
  weekDay: string;
  series: number;
  muscleGroup: string;
  equipment: string;
  observation: string;
  repetitions: number;
}

export interface UserExerciseFormData {
  userId: string;
  exerciseId: string;
  weekDay: string;
  series: number;
  repetitions: number;
  observation: string;
}

export type WeekDay = "SEGUNDA" | "TERCA" | "QUARTA" | "QUINTA" | "SEXTA" | "SABADO" | "DOMINGO";
