import { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import AuthContext from "@/app/authContext"; // Ajuste o caminho conforme sua estrutura
import { Exercise, ExerciseFormData } from "../types";
import {
  fetchExercises as apiFetchExercises,
  createExercise as apiCreateExercise,
  updateExercise as apiUpdateExercise,
  deleteExercise as apiDeleteExercise,
} from "../services/exerciseService";

export const useExercises = () => {
  const auth = useContext(AuthContext);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExerciseFormData>({
    name: "",
    description: "",
    muscleGroup: "",
    equipment: "",
    image: "",
  });

  useEffect(() => {
    const loadExercises = async () => {
      if (!auth?.token) {
        toast.error("Usuário não autenticado.", {
          duration: 3000,
          style: {
            background: "#ffb0ab",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await apiFetchExercises(auth.token);
        setExercises(data);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao buscar exercícios.", {
          duration: 3000,
          style: {
            background: "#ffb0ab",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, [auth?.token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.token) {
      toast.error("Usuário não autenticado.", {
        duration: 3000,
        style: {
          background: "#ffb0ab",
          color: "#fff",
          borderRadius: "8px",
          border: "1px solid #fff",
        },
      });
      return;
    }

    try {
      let updatedExercise: Exercise;
      if (editingId) {
        updatedExercise = await apiUpdateExercise(
          editingId,
          formData,
          auth.token
        );
        setExercises((prev) =>
          prev.map((ex) => (ex.id === editingId ? updatedExercise : ex))
        );
        toast.success("Exercício atualizado com sucesso!", {
          duration: 3000,
          style: {
            background: "#b2f2bb",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
      } else {
        updatedExercise = await apiCreateExercise(formData, auth.token);
        setExercises((prev) => [...prev, updatedExercise]);
        toast.success("Exercício cadastrado com sucesso!", {
          duration: 3000,
          style: {
            background: "#b2f2bb",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
      }
      setFormData({
        name: "",
        description: "",
        muscleGroup: "",
        equipment: "",
        image: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar exercício.", {
        duration: 3000,
        style: {
          background: "#ffb0ab",
          color: "#fff",
          borderRadius: "8px",
          border: "1px solid #fff",
        },
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!auth?.token) {
      toast.error("Usuário não autenticado.", {
        duration: 3000,
        style: {
          background: "#ffb0ab",
          color: "#fff",
          borderRadius: "8px",
          border: "1px solid #fff",
        },
      });
      return;
    }
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      await apiDeleteExercise(id, auth.token);
      setExercises((prev) => prev.filter((ex) => ex.id !== id));
      toast.success("Exercício excluído com sucesso!", {
        duration: 3000,
        style: {
          background: "#b2f2bb",
          color: "#fff",
          borderRadius: "8px",
          border: "1px solid #fff",
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir exercício.", {
        duration: 3000,
        style: {
          background: "#ffb0ab",
          color: "#fff",
          borderRadius: "8px",
          border: "1px solid #fff",
        },
      });
    }
  };

  const handleEdit = (exercise: Exercise) => {
    setFormData({
      name: exercise.name,
      description: exercise.description,
      muscleGroup: exercise.muscleGroup,
      equipment: exercise.equipment,
      image: exercise.image || "",
    });
    setEditingId(exercise.id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      muscleGroup: "",
      equipment: "",
      image: "",
    });
  };

  return {
    exercises,
    loading,
    editingId,
    formData,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleChange,
    cancelEdit,
  };
};
