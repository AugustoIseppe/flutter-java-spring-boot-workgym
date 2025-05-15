"use client";

import { useSocialMedia } from "@/features/social-media/hooks/useSocialMedia";
import Pagina from "@/components/template/Pagina";

export default function SocialMediaPage() {
  const {
    socialMedia,
    loading,
    editingId,
    formData,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleChange,
    cancelEdit,
  } = useSocialMedia();

  return (
    <Pagina>
      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-6 font-sans">
        <h1 className="text-2xl font-bold text-zinc-900">Redes Sociais</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 border rounded shadow-sm bg-white"
        >
          <h2 className="text-xl font-semibold text-zinc-900">
            {editingId ? "Editar Rede Social" : "Adicionar Rede Social"}
          </h2>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            className="border p-2 rounded text-black"
          />
          <input
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Link"
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
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="w-full h-0.5 bg-gray-300 my-1" />
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-4xl w-fit">
          <p className="text-sm text-zinc-800 font-bold">
            {socialMedia.length > 0
              ? `Total de redes sociais: ${socialMedia.length}`
              : "Nenhuma rede social cadastrada."}
          </p>
        </div>

        {loading ? (
          <p>Carregando Redes Sociais...</p>
        ) : socialMedia.length === 0 ? (
          <p>Nenhuma rede social cadastrada.</p>
        ) : (
          <div className="overflow-x-auto text-center items-center justify-center rounded-xl shadow-sm">
            <table className="min-w-full bg-white rounded shadow text-sm text-black text-center">
              <thead className="bg-gray-200 text-center">
                <tr className="text-center">
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Link
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 items-center justify-center text-center">
                {socialMedia.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200 text-center"
                  >
                    <td className="px-4 py-2 text-sm font-medium text-gray-500 whitespace-nowrap text-center">
                      {item.name}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-500 whitespace-nowrap text-center">
                      {item.link}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-500 flex gap-2 whitespace-nowrap text-center items-center justify-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-300 px-2 py-1 rounded hover:bg-blue-300 text-xs font-bold text-zinc-900 items-center justify-center"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-200 px-2 py-1 rounded hover:bg-red-300 text-xs font-bold text-zinc-900"
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
