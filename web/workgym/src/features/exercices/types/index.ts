export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  equipment: string;
  image?: string;
}

export interface ExerciseFormData {
  name: string;
  description: string;
  muscleGroup: string;
  equipment: string;
  image?: string;
}
