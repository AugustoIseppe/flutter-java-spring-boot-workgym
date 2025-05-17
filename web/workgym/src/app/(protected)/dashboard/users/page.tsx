"use client";

import { useUser } from "@/features/users/hooks/useUser";
import Pagina from "@/components/template/Pagina";

export default function UsersPage() {

  const {
    users,
    loading,
    editingId,
    formData,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleChange,
    cancelEdit,
  } = useUser();
  

  return (
    <Pagina>
      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-2 font-sans">
        <h1 className="text-2xl font-bold text-zinc-900">Usuários</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 mb-6 border rounded shadow-sm bg-white">
          <h2 className="text-xl font-bold text-zinc-900">
            {editingId ? "Editar Usuário" : "Cadastrar Usuário"}
          </h2>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            placeholder="Login"
            required
            className="border p-2 rounded text-black"
          />
          {/* <input
            // type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            required
            className="border p-2 rounded text-black"
          /> */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
            className="border p-2 rounded text-black"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border p-2 rounded text-black"
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            className="border p-2 rounded text-black"
          />
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="CPF"
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
            {users.length > 0
              ? `Total de usuários: ${users.length}`
              : "Nenhum usuário cadastrado"}
          </p>
        </div>

        {loading ? (
          <p>Carregando usuários...</p>
        ) : users.length === 0 ? (
          <p>Nenhum usuário cadastrado.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="min-w-full bg-white rounded shadow text-sm text-black">
              <thead className="bg-gray-200 text-center">
                <tr className="text-center">
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Login</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors duration-200 text-center"
                  >
                    
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap text-center">{user.name}</td>
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap text-center">{user.login}</td>
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap text-center">{user.role}</td>
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap text-center">{user.email}</td>
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap text-center">{user.cpf}</td>
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-200 px-2 py-1 rounded hover:bg-blue-300 text-xs font-bold m-1"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-200 px-2 py-1 rounded hover:bg-red-300 text-xs font-bold m-1"
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
