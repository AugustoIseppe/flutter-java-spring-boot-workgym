"use client";

import { useState, useEffect, useContext } from "react";
import Pagina from "@/components/template/Pagina";
import AuthContext from "@/app/authContext";
import { toast } from "sonner";

interface Exercise {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface UserExercise {
  id: string; // ID do registro UserExercise (ex: da tabela de junção)
  userId: string;
  exerciseId: string; // ID do Exercise original
  weekDay: string;
  series: number;
  repetitions: number;
  observation: string;
  exercise: Exercise; // Objeto Exercise aninhado
  user: {
    id: string;
    name: string;
  };
}

// Interface para os dados crus da API /user-exercises/${userId}
interface ApiUserExerciseItem {
  id?: string; // Opcional, se a API retornar um ID para o UserExercise
  exerciseId?: string; // Opcional, se a API retornar o ID do exercício diretamente
  name: string; // Nome do exercício
  description: string;
  image: string;
  weekDay: string;
  series: number;
  muscleGroup: string; // Mantido, embora não na interface Exercise
  equipment: string; // Mantido, embora não na interface Exercise
  observation: string;
  repetitions: number;
}

export default function WorkoutsPage() {
  const auth = useContext(AuthContext);
  const [exercises, setExercises] = useState<Exercise[]>([]); // Lista de todos os exercícios disponíveis
  const [users, setUsers] = useState<any[]>([]);
  // userExercises (todos os treinos de todos os usuários) não parece ser usado para exibir os treinos de um usuário selecionado.
  // const [userExercises, setUserExercises] = useState<UserExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null); // ID do UserExercise que está sendo editado
  const [selectedUserExercises, setSelectedUserExercises] = useState<
    UserExercise[]
  >([]);

  const [formData, setFormData] = useState({
    userId: "",
    exerciseId: "", // Este será o ID do exercício (da lista 'exercises')
    weekDay: "SEGUNDA",
    series: 3,
    repetitions: 12,
    observation: "",
  });

  // Efeito para buscar os treinos específicos do usuário selecionado
  useEffect(() => {
    if (!formData.userId || !auth?.token || exercises.length === 0) {
      setSelectedUserExercises([]);
      // Não buscar se não houver userId, token ou a lista de exercícios base não estiver carregada
      // (necessária para mapear nome para exerciseId e outros detalhes do exercício)
      return;
    }

    const fetchUserExercises = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/user-exercises/${formData.userId}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error(
            "Erro ao buscar treinos do usuário - Status:",
            response.status,
            "Detalhes:",
            errorData
          );
          throw new Error(
            `Erro ao buscar treinos do usuário: ${response.statusText}`
          );
        }

        const dataFromApi: ApiUserExerciseItem[] = await response.json();

        const transformedUserExercises = dataFromApi.map((apiItem, index) => {
          const relatedExercise = exercises.find((ex) =>
            apiItem.exerciseId
              ? ex.id === apiItem.exerciseId
              : ex.name === apiItem.name
          );

          const currentUser = users.find((u) => u.id === formData.userId);

          return {
            id:
              apiItem.id ||
              `user-exercise-${formData.userId}-${
                relatedExercise?.id || apiItem.name
              }-${index}`,
            userId: formData.userId,
            exerciseId: relatedExercise?.id || "", // ID do exercício da lista 'exercises'
            weekDay: apiItem.weekDay,
            series: apiItem.series,
            repetitions: apiItem.repetitions,
            observation: apiItem.observation,
            exercise: {
              // Objeto aninhado 'exercise' conforme a interface Exercise
              id: relatedExercise?.id || "", // ID do exercício
              name: relatedExercise?.name || apiItem.name, // Prioriza dados de 'relatedExercise' se encontrado
              description: relatedExercise?.description || apiItem.description,
              image: relatedExercise?.image || apiItem.image,
            },
            user: {
              id: formData.userId,
              name: currentUser?.name || "Usuário não encontrado",
            },
          };
        });

        setSelectedUserExercises(transformedUserExercises);
      } catch (err) {
        console.error(
          "Falha ao buscar ou transformar treinos do usuário:",
          err
        );
        // Evitar alert() em produção para melhor UX, preferir notificações no UI
        // alert("Erro ao buscar treinos do usuário.");
      }
    };

    fetchUserExercises();
  }, [formData.userId, auth?.token, exercises, users]); // Dependências atualizadas

  // Buscar dados iniciais (usuários e lista de todos os exercícios)
  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return; // Não fazer nada se não houver token
      try {
        setLoading(true);

        // Buscar usuários
        const usersRes = await fetch("http://localhost:8080/users", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        if (!usersRes.ok) throw new Error("Erro ao buscar usuários");
        const usersData = await usersRes.json();
        setUsers(usersData);

        // Buscar todos os exercícios (para referência)
        const exercisesRes = await fetch("http://localhost:8080/exercises", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        if (!exercisesRes.ok) throw new Error("Erro ao buscar exercícios");
        const exercisesData = await exercisesRes.json();
        setExercises(exercisesData);
      } catch (err) {
        console.error("Erro ao carregar dados iniciais:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth?.token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.token) {
      toast.error("Erro de autenticação. Por favor, faça login novamente.", {
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
    if (!formData.exerciseId) {
      toast.error(
        "Selecione um exercício antes de cadastrar/atualizar o treino.",
        {
          duration: 3000,
          style: {
            background: "#ffb0ab",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        }
      );
      return;
    }

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8080/user-exercises/${editingId}`
      : "http://localhost:8080/user-exercises";

    const payload = {
      userId: formData.userId,
      exerciseId: formData.exerciseId, // ID do exercício selecionado
      weekDay: formData.weekDay,
      series: formData.series,
      repetitions: formData.repetitions,
      observation: formData.observation,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao cadastrar/atualizar treino");
      }
      toast.success(
        editingId
          ? "Treino atualizado com sucesso!"
          : "Treino cadastrado com sucesso!",
        {
          duration: 3000,
          style: {
            background: "#9ed7a0",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        }
      );

      // Resetar formulário
      setFormData({
        userId: formData.userId, // Manter o usuário selecionado
        exerciseId: "",
        weekDay: "SEGUNDA",
        series: 3,
        repetitions: 12,
        observation: "",
      });
      setEditingId(null);

      if (formData.userId && auth?.token && exercises.length > 0) {
        const tempUserId = formData.userId;
        setFormData((prev) => ({ ...prev, userId: "" })); // Limpa para forçar o useEffect
        setTimeout(
          () =>
            setFormData((prev) => ({
              ...prev,
              userId: tempUserId,
              exerciseId: "",
              weekDay: "SEGUNDA",
              series: 3,
              repetitions: 12,
              observation: "",
            })),
          0
        ); // Restaura
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao cadastrar/atualizar treino.", {
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
    if (!confirm("Tem certeza que deseja excluir este treino?") || !auth?.token)
      return;

    try {
      const response = await fetch(
        `http://localhost:8080/user-exercises/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Erro ao excluir treino");

      setSelectedUserExercises((prev) => prev.filter((item) => item.id !== id));
      toast.success("Treino excluído com sucesso!", {
        duration: 3000,
        style: {
          background: "#9ed7a0",
          color: "#fff",
          borderRadius: "8px",
          border: "1px solid #fff",
        },
      });
    } catch (err) {
      console.error(err);

      toast.error("Erro ao excluir treino.", {
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

  const handleEdit = (userExerciseToEdit: UserExercise) => {
    setFormData({
      userId: userExerciseToEdit.userId,
      exerciseId: userExerciseToEdit.exerciseId, // ID do exercício original
      weekDay: userExerciseToEdit.weekDay,
      series: userExerciseToEdit.series,
      repetitions: userExerciseToEdit.repetitions,
      observation: userExerciseToEdit.observation,
    });
    setEditingId(userExerciseToEdit.id); // ID do registro UserExercise
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "series" || name === "repetitions"
          ? parseInt(value) || 0
          : value,
    }));
  };

  if (loading)
    return (
      <Pagina>
        <p>Carregando...</p>
      </Pagina>
    );

  return (
    <Pagina>
      <div className="max-w-5xl mx-auto p-2 flex flex-col gap-2 font-sans">
        <h1 className="text-2xl font-bold text-zinc-900">Treinos do Usuário</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 border rounded shadow-sm bg-white"
        >
          <h2 className="text-xl font-semibold text-zinc-900">
            {editingId ? "Editar Treino" : "Adicionar Treino"}
          </h2>
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              Usuário
            </label>
            <select
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="mt-1 block w-full border p-2 rounded text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={!!editingId} // Desabilitar se estiver editando, pois o usuário do treino não deve mudar
            >
              <option value="">Selecione o usuário</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="exerciseId"
              className="block text-sm font-medium text-gray-700"
            >
              Exercício
            </label>
            <select
              id="exerciseId"
              name="exerciseId"
              value={formData.exerciseId}
              onChange={handleChange}
              required
              className="mt-1 block w-full border p-2 rounded text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecione o exercício</option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="weekDay"
              className="block text-sm font-medium text-gray-700"
            >
              Dia da Semana
            </label>
            <select
              id="weekDay"
              name="weekDay"
              value={formData.weekDay}
              onChange={handleChange}
              required
              className="mt-1 block w-full border p-2 rounded text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="SEGUNDA">SEGUNDA</option>
              <option value="TERCA">TERÇA</option>
              <option value="QUARTA">QUARTA</option>
              <option value="QUINTA">QUINTA</option>
              <option value="SEXTA">SEXTA</option>
              <option value="SABADO">SÁBADO</option>
              <option value="DOMINGO">DOMINGO</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="series"
                className="block text-sm font-medium text-gray-700"
              >
                Séries
              </label>
              <input
                id="series"
                type="number"
                name="series"
                value={formData.series}
                onChange={handleChange}
                placeholder="Séries"
                required
                min="1"
                className="mt-1 block w-full border p-2 rounded text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="repetitions"
                className="block text-sm font-medium text-gray-700"
              >
                Repetições
              </label>
              <input
                id="repetitions"
                type="number"
                name="repetitions"
                value={formData.repetitions}
                onChange={handleChange}
                placeholder="Repetições"
                required
                min="1"
                className="mt-1 block w-full border p-2 rounded text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="observation"
              className="block text-sm font-medium text-gray-700"
            >
              Observações
            </label>
            <input
              id="observation"
              type="text"
              name="observation"
              value={formData.observation}
              onChange={handleChange}
              placeholder="Observações (opcional)"
              className="mt-1 block w-full border p-2 rounded text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 shadow-2xl"
              disabled={!formData.userId || !formData.exerciseId} // Desabilitar se usuário ou exercício não selecionado
            >
              {editingId ? "Atualizar Treino" : "Cadastrar Treino"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    userId: formData.userId, // Manter usuário selecionado
                    exerciseId: "",
                    weekDay: "SEGUNDA",
                    series: 3,
                    repetitions: 12,
                    observation: "",
                  });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar Edição
              </button>
            )}
          </div>
        </form>

        <div className="w-full h-px bg-gray-300 my-6" />

        {formData.userId && (
          <>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded w-fit mb-4">
              <p className="text-xs text-zinc-800 font-bold">
                {selectedUserExercises.length > 0
                  ? `Total de treinos: ${selectedUserExercises.length}`
                  : "Nenhum treino encontrado para este usuário."}
              </p>
            </div>

            {selectedUserExercises.length === 0 && !loading ? (
              <p className="mt-2">
                Nenhum treino atribuído a este usuário ou dados ainda
                carregando.
              </p>
            ) : (
              <div className="overflow-x-auto mt-2 text-center items-center justify-center rounded-xl shadow-sm">
                <table className="min-w-full bg-white rounded shadow text-sm text-black text-center items-center justify-center">
                  <thead className="bg-gray-200 text-center items-center justify-center">
                    <tr className="items-center justify-centeritems-center justify-center">
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider items-center justify-center">
                        Exercício
                      </th>
                      <th className="px-4 py-3 text-center items-center justify-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dia da Semana
                      </th>
                      <th className="px-4 py-3 text-center items-center justify-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Séries
                      </th>
                      <th className="px-4 py-3 text-center items-center justify-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Repetições
                      </th>
                      <th className="px-4 py-3 text-center items-center justify-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Observações
                      </th>
                      <th className="px-4 py-3 text-center items-center justify-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-center items-center justify-center">
                    {selectedUserExercises.map((userExerciseItem) => (
                      <tr
                        key={userExerciseItem.id} // Usar o ID do UserExercise (que deve ser único)
                        className="hover:bg-gray-50 text-center items-center justify-center"
                      >
                        <td className="px-4 py-2 whitespace-nowrap text-center items-center justify-center">
                          <div className="flex items-center text-center justify-center">
                            {userExerciseItem.exercise.image && (
                              <img
                                src={`/images/${userExerciseItem.exercise.image}`}
                                alt={userExerciseItem.exercise.name}
                                className="w-10 h-10 rounded-full mr-3 object-cover"
                                onError={(e) =>
                                  (e.currentTarget.style.display = "none")
                                }
                              />
                            )}
                            <div className="flex flex-col text-center items-center justify-center" >
                              <div className="text-sm font-medium text-gray-900 text-center items-center justify-center">
                                {userExerciseItem.exercise?.name ||
                                  "Nome não disponível"}
                              </div>
                              <div className="text-xs text-gray-500 text-center items-center justify-center ">
                                {userExerciseItem.exercise?.description ||
                                  "Descrição não disponível"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-center items-center justify-center">
                          {userExerciseItem.weekDay}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-center items-center justify-center">
                          {userExerciseItem.series}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-center items-center justify-center">
                          {userExerciseItem.repetitions}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-center items-center justify-center ">
                          {userExerciseItem.observation}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-center">
                          <button
                            onClick={() => handleEdit(userExerciseItem)}
                            className="bg-blue-300 px-2 py-1 rounded hover:bg-blue-300 text-xs font-bold text-zinc-900 text-center items-center justify-center mr-0.5"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(userExerciseItem.id)}
                            className="bg-red-200 px-2 py-1 rounded hover:bg-red-300 text-xs font-bold text-zinc-900 ml-0.5"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </Pagina>
  );
}
