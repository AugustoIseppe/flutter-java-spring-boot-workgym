"use client";

import { useState, useEffect, useContext } from "react";
import Pagina from "@/components/template/Pagina";
import AuthContext from "@/app/authContext";

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
  equipment: string;   // Mantido, embora não na interface Exercise
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
          console.error("Erro ao buscar treinos do usuário - Status:", response.status, "Detalhes:", errorData);
          throw new Error(`Erro ao buscar treinos do usuário: ${response.statusText}`);
        }

        const dataFromApi: ApiUserExerciseItem[] = await response.json();

        // Transformar os dados da API para a estrutura UserExercise esperada pelo componente
        const transformedUserExercises = dataFromApi.map((apiItem, index) => {
          // Tenta encontrar o exercício correspondente na lista de exercícios carregada
          // para obter o ID do exercício e garantir que os dados estejam completos.
          const relatedExercise = exercises.find(ex => 
            // A correspondência pode ser por nome, mas idealmente a API /user-exercises/{userId}
            // retornaria o exerciseId diretamente.
            // Se 'apiItem.exerciseId' for retornado pela API, use-o para encontrar 'relatedExercise'.
            // Se não, use o nome como fallback (pode não ser único).
            apiItem.exerciseId ? ex.id === apiItem.exerciseId : ex.name === apiItem.name
          );

          const currentUser = users.find(u => u.id === formData.userId);

          return {
            // Se a API /user-exercises/{userId} retorna um ID para o registro UserExercise (ex: id da tabela de junção),
            // use-o aqui. Caso contrário, um ID terá que ser gerado ou a lógica de edição/exclusão ajustada.
            // O exemplo de JSON não mostrava um 'id' para o UserExercise em si.
            id: apiItem.id || `user-exercise-${formData.userId}-${relatedExercise?.id || apiItem.name}-${index}`, 
            userId: formData.userId,
            exerciseId: relatedExercise?.id || "", // ID do exercício da lista 'exercises'
            weekDay: apiItem.weekDay,
            series: apiItem.series,
            repetitions: apiItem.repetitions,
            observation: apiItem.observation,
            exercise: { // Objeto aninhado 'exercise' conforme a interface Exercise
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
        console.error("Falha ao buscar ou transformar treinos do usuário:", err);
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

        // A busca inicial de userExercises para todos os usuários foi removida,
        // pois selectedUserExercises é preenchido pelo outro useEffect quando um usuário é selecionado.
        // Se você precisar de todos os userExercises por algum outro motivo, pode adicionar de volta.
        // const userExercisesRes = await fetch("http://localhost:8080/user-exercises", ...);
        // const userExercisesData = await userExercisesRes.json();
        // setUserExercises(userExercisesData); 

      } catch (err) {
        console.error("Erro ao carregar dados iniciais:", err);
        // alert("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth?.token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.token) {
      alert("Autenticação necessária.");
      return;
    }
    if (!formData.exerciseId) {
        alert("Por favor, selecione um exercício válido.");
        return;
    }

    const method = editingId ? "PUT" : "POST";
    // Para POST, a URL é /user-exercises. Para PUT, é /user-exercises/{id_do_user_exercise}
    const url = editingId
      ? `http://localhost:8080/user-exercises/${editingId}` 
      : "http://localhost:8080/user-exercises";

    // O corpo da requisição para POST /user-exercises deve corresponder ao que o backend espera.
    // Geralmente, para criar um UserExercise, você enviaria userId, exerciseId, weekDay, series, etc.
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

      // Após um POST/PUT bem-sucedido, o ideal é que o backend retorne o objeto criado/atualizado.
      // Se retornar, use-o para atualizar o estado. Senão, refaça o fetchUserExercises.
      // Por simplicidade, vamos refazer o fetch para garantir dados atualizados.
      // const updatedExerciseData = await response.json(); // Se o backend retornar o objeto
      
      alert(editingId ? "Treino atualizado!" : "Treino cadastrado!");
      
      // Refazer o fetch para atualizar a lista selectedUserExercises
      // Isso requer que o useEffect de fetchUserExercises seja acionado.
      // Uma forma é resetar formData.userId e depois setá-lo novamente, mas é deselegante.
      // Melhor é ter uma função para buscar que possa ser chamada aqui.
      // Ou, se o backend retornar o item atualizado/criado, atualizar o estado diretamente.

      // Solução simples: forçar um re-fetch se não houver retorno do objeto atualizado
      // Se o backend retornar o objeto UserExercise completo e atualizado:
      // const returnedUserExercise = await response.json();
      // // Você precisaria transformar este returnedUserExercise também, se ele não vier na estrutura aninhada.
      // // E então atualizar o selectedUserExercises.

      // Por agora, vamos apenas limpar o formulário e o usuário terá que selecionar novamente para ver a atualização,
      // ou você pode implementar um re-fetch mais robusto.
      // Para um re-fetch simples, você pode chamar a função fetchUserExercises diretamente se ela for definida fora do useEffect
      // ou adicionar um estado para forçar o re-fetch.

      // Exemplo de atualização direta se o backend retornar o UserExercise completo (já transformado ou a transformar):
      // const newOrUpdatedItem = await response.json(); // Supondo que já está na estrutura correta ou transformar aqui
      // if (editingId) {
      //   setSelectedUserExercises(prev => prev.map(item => item.id === editingId ? newOrUpdatedItem : item));
      // } else {
      //   setSelectedUserExercises(prev => [...prev, newOrUpdatedItem]);
      // }

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

      // Para forçar a atualização da lista após cadastro/edição, é melhor refazer a busca.
      // Temporariamente, vamos simular um re-fetch alterando uma dependência do useEffect de busca.
      // Isso é um hack. O ideal é que o backend retorne o dado atualizado ou ter uma função de fetch separada.
      if (formData.userId && auth?.token && exercises.length > 0) {
        const tempUserId = formData.userId;
        setFormData(prev => ({...prev, userId: ''})); // Limpa para forçar o useEffect
        setTimeout(() => setFormData(prev => ({...prev, userId: tempUserId, exerciseId: '', weekDay: 'SEGUNDA', series: 3, repetitions: 12, observation: ''})), 0); // Restaura
      }


    } catch (err: any) {
      console.error(err);
      alert(err.message || "Erro ao cadastrar/atualizar treino.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este treino?") || !auth?.token) return;

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
      alert("Treino excluído!");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir treino.");
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
        name === "series" || name === "repetitions" ? parseInt(value) || 0 : value,
    }));
  };

  if (loading) return <Pagina><p>Carregando...</p></Pagina>; 

  return (
    <Pagina>
      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-2 font-sans">
        <h1 className="text-2xl font-bold">Treinos do Usuário</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded shadow-md">
          <h2 className="text-xl font-semibold">{editingId ? "Editar Treino" : "Adicionar Treino"}</h2>
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">Usuário</label>
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
            <label htmlFor="exerciseId" className="block text-sm font-medium text-gray-700">Exercício</label>
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
            <label htmlFor="weekDay" className="block text-sm font-medium text-gray-700">Dia da Semana</label>
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
              <label htmlFor="series" className="block text-sm font-medium text-gray-700">Séries</label>
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
              <label htmlFor="repetitions" className="block text-sm font-medium text-gray-700">Repetições</label>
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
            <label htmlFor="observation" className="block text-sm font-medium text-gray-700">Observações</label>
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
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
            <h2 className="text-xl font-semibold mb-2">Treinos de {users.find(u => u.id === formData.userId)?.name || "Usuário Selecionado"}</h2>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded w-fit mb-4">
              <p className="text-xs text-zinc-800 font-bold">
                {selectedUserExercises.length > 0
                  ? `Total de treinos: ${selectedUserExercises.length}`
                  : "Nenhum treino encontrado para este usuário."}
              </p>
            </div>

            {selectedUserExercises.length === 0 && !loading ? (
              <p className="mt-2">Nenhum treino atribuído a este usuário ou dados ainda carregando.</p>
            ) : (
              <div className="overflow-x-auto mt-2">
                <table className="min-w-full bg-white rounded shadow text-sm text-black">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exercício</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dia da Semana</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Séries</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Repetições</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observações</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedUserExercises.map((userExerciseItem) => (
                      <tr
                        key={userExerciseItem.id} // Usar o ID do UserExercise (que deve ser único)
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="flex items-center">
                            {userExerciseItem.exercise.image && (
                                <img src={`/images/${userExerciseItem.exercise.image}`} alt={userExerciseItem.exercise.name} className="w-10 h-10 rounded-full mr-3 object-cover" onError={(e) => e.currentTarget.style.display = 'none'}/>
                            )}
                            <div>
                                <div className="text-sm font-medium text-gray-900">{userExerciseItem.exercise?.name || "Nome não disponível"}</div>
                                <div className="text-xs text-gray-500">{userExerciseItem.exercise?.description || "Descrição não disponível"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {userExerciseItem.weekDay}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-center">{userExerciseItem.series}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-center">
                          {userExerciseItem.repetitions}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {userExerciseItem.observation}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-center">
                          <button 
                            onClick={() => handleEdit(userExerciseItem)} 
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => handleDelete(userExerciseItem.id)} 
                            className="text-red-600 hover:text-red-900"
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

