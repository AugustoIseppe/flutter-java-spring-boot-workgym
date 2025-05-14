"use client";

import Pagina from "@/components/template/Pagina"; // Ajuste o caminho se necessário
import { useExercises } from "@/features/exercices/hooks/useExercises";

export default function ExercisesPage() {
  const {
    exercises,
    loading,
    editingId,
    formData,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleChange,
    cancelEdit,
  } = useExercises();

  return (
    <Pagina>
      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-6 font-sans">
        <h1 className="text-2xl font-bold text-zinc-950">
          Cadastro de Exercícios
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded shadow-sm bg-white">
          <h2 className="text-xl font-semibold text-zinc-950">
            {editingId ? "Editar Exercício" : "Adicionar Exercício"}
          </h2>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            className="border p-2 rounded text-black"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição"
            className="border p-2 rounded text-black"
            required
          />
          <input
            name="muscleGroup"
            value={formData.muscleGroup}
            onChange={handleChange}
            placeholder="Grupo muscular"
            className="border p-2 rounded text-black"
            required
          />
          <input
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            placeholder="Equipamento"
            className="border p-2 rounded text-black"
            required
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="URL da Imagem (opcional)"
            className="border p-2 rounded text-black"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingId ? "Atualizar" : "Cadastrar"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit} // Usando a função cancelEdit do hook
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
        <div className="flex items-center justify-center w-full h-0.5 bg-gray-300 my-2">
          {/* Linha divisória pode ser um componente ou um simples div estilizado */}
        </div>
        <h2 className="text-xl font-bold text-zinc-950">
          Exercícios cadastrados
        </h2>
        {loading ? (
          <p>Carregando exercícios...</p>
        ) : exercises.length === 0 ? (
          <p>Nenhum exercício cadastrado.</p>
        ) : (
          <div className="overflow-x-auto text-center items-center justify-center rounded-xl shadow-sm">
            <table className="min-w-full bg-white rounded shadow text-sm text-black">
              <thead className="bg-gray-200 text-center items-center justify-center">
                <tr className="text-center">
                  <th className="px-4 py-2 text-center items-center justify-center text-gray-500">Nome</th>
                  <th className="px-4 py-2 text-center items-center justify-center text-gray-500">Descrição</th>
                  <th className="px-4 py-2 text-center items-center justify-center text-gray-500">Grupo Muscular</th>
                  <th className="px-4 py-2 text-center items-center justify-center text-gray-500">Equipamento</th>
                  <th className="px-4 py-2 text-center items-center justify-center text-gray-500">Ações</th>
                </tr>
              </thead>
              <tbody className="text-center items-center justify-center">
                {exercises.map((ex, index) => (
                  <tr
                    key={ex.id}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="px-4 py-2 text-center items-center justify-center text-gray-500">{ex.name}</td>
                    <td className="px-4 py-2 text-center items-center justify-center text-gray-500">{ex.description}</td>
                    <td className="px-4 py-2 text-center items-center justify-center text-gray-500">{ex.muscleGroup}</td>
                    <td className="px-4 py-2 text-center items-center justify-center text-gray-500">{ex.equipment}</td>
                    <td className="px-4 py-2 text-center items-center justify-center text-gray-500 flex gap-2">
                      <button
                        onClick={() => handleEdit(ex)}
                        className="text-zinc-950 bg-blue-200 px-2 py-1 rounded hover:bg-blue-300 text-xs font-bold"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(ex.id)}
                        className="bg-red-200 text-zinc-900 px-2 py-1 rounded hover:bg-red-300 text-xs font-bold"
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
      </div>
    </Pagina>
  );
}

