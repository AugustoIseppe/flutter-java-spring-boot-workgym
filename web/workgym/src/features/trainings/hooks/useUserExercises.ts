import { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import AuthContext from "@/app/authContext"; // Ajuste o caminho conforme sua estrutura
import { 
  UserExercise, 
  UserExerciseFormData, 
  Exercise, 
  User,
  WeekDay
} from "../types";
import {
  fetchUsers,
  fetchExercises,
  fetchUserExercises,
  createUserExercise,
  updateUserExercise,
  deleteUserExercise
} from "../services/userExerciseService";

export const useUserExercises = () => {
  const auth = useContext(AuthContext);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserExercises, setSelectedUserExercises] = useState<UserExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<UserExerciseFormData>({
    userId: "",
    exerciseId: "",
    weekDay: "SEGUNDA",
    series: 3,
    repetitions: 12,
    observation: "",
  });

  // Buscar dados iniciais (usuários e exercícios)
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!auth?.token) return;
      
      try {
        setLoading(true);
        
        // Buscar usuários e exercícios em paralelo
        const [usersData, exercisesData] = await Promise.all([
          fetchUsers(auth.token ?? undefined),
          fetchExercises(auth.token ?? undefined)
        ]);
        
        setUsers(usersData);
        setExercises(exercisesData);
      } catch (err) {
        console.error("Erro ao carregar dados iniciais:", err);
        toast.error("Erro ao carregar dados iniciais.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, [auth?.token]);

  // Buscar treinos do usuário selecionado
  useEffect(() => {
    if (!formData.userId || !auth?.token || exercises.length === 0) {
      setSelectedUserExercises([]);
      return;
    }

    const loadUserExercises = async () => {
      try {
        const data = await fetchUserExercises(
          formData.userId, 
          auth.token ?? undefined, 
          exercises, 
          users
        );
        setSelectedUserExercises(data);
      } catch (err) {
        console.error("Falha ao buscar treinos do usuário:", err);
        toast.error("Erro ao buscar treinos do usuário.");
      }
    };

    loadUserExercises();
  }, [formData.userId, auth?.token, exercises, users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!auth?.token) {
      toast.error("Erro de autenticação. Por favor, faça login novamente.");
      return;
    }
    
    if (!formData.exerciseId) {
      toast.error("Selecione um exercício antes de cadastrar/atualizar o treino.");
      return;
    }

    try {
      let updatedUserExercise: UserExercise;
      
      if (editingId) {
        updatedUserExercise = await updateUserExercise(editingId, formData, auth.token);
        setSelectedUserExercises(prev => 
          prev.map(item => item.id === editingId ? updatedUserExercise : item)
        );
        toast.success("Treino atualizado com sucesso!");
      } else {
        updatedUserExercise = await createUserExercise(formData, auth.token);
        setSelectedUserExercises(prev => [...prev, updatedUserExercise]);
        toast.success("Treino cadastrado com sucesso!");
      }
      
      resetForm();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao cadastrar/atualizar treino.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este treino?") || !auth?.token) return;

    try {
      await deleteUserExercise(id, auth.token);
      setSelectedUserExercises(prev => prev.filter(item => item.id !== id));
      toast.success("Treino excluído com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir treino.");
    }
  };

  const handleEdit = (userExerciseToEdit: UserExercise) => {
    setFormData({
      userId: userExerciseToEdit.userId,
      exerciseId: userExerciseToEdit.exerciseId,
      weekDay: userExerciseToEdit.weekDay as WeekDay,
      series: userExerciseToEdit.series,
      repetitions: userExerciseToEdit.repetitions,
      observation: userExerciseToEdit.observation,
    });
    setEditingId(userExerciseToEdit.id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "series" || name === "repetitions" 
        ? parseInt(value) || 0 
        : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      userId: formData.userId, // Manter o usuário selecionado
      exerciseId: "",
      weekDay: "SEGUNDA",
      series: 3,
      repetitions: 12,
      observation: "",
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    resetForm();
  };

  return {
    exercises,
    users,
    selectedUserExercises,
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
