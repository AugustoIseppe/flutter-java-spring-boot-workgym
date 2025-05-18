"use client";

import Pagina from "@/components/template/Pagina";
import { useUserExercises } from "@/features/trainings/hooks/useUserExercises";

export default function WorkoutsPage() {
  const {
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
  } = useUserExercises();

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
                onClick={cancelEdit}
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
                        key={userExerciseItem.id}
                        className="hover:bg-gray-100 text-center items-center justify-center"
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
                            <div className="flex flex-col text-center items-center justify-center">
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
