"use client";

import { useState, useEffect, useContext } from "react";
import Pagina from "@/components/template/Pagina";
import AuthContext from "@/app/authContext";
import { toast } from "sonner";

export default function UsersPage() {
  const auth = useContext(AuthContext);

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    name: "",
    email: "",
    role: "",
    cpf: "",
    oldPassword: "",
    newPassword: "",
  });

  // Buscar usuários ao carregar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        if (!res.ok) throw new Error("Erro ao buscar usuários");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao buscar usuários.", {
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
    fetchUsers();
  }, [auth?.token]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const method = editingId ? "PUT" : "POST";
  const url = editingId
    ? `http://localhost:8080/users/${editingId}`
    : "http://localhost:8080/auth/register";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify(formData),
    });

    // Se a resposta não for OK, tenta extrair o texto de erro
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro ao cadastrar/atualizar usuário");
    }

    // Só tenta fazer parse do JSON se realmente for JSON
    const contentType = response.headers.get("content-type");
    const updatedUser = contentType?.includes("application/json")
      ? await response.json()
      : null;

    if (editingId) {
      setUsers((prev) =>
        prev.map((item) => (item.id === updatedUser?.id ? updatedUser : item))
      );
      toast.success("Usuário atualizado com sucesso!", {
        duration: 3000,
        style: {
          background: "#9ed7a0",
          color: "#fff",
          borderRadius: "8px",
          border: "1px solid #fff",
        },
      });
    } else {
      if (updatedUser) {
        setUsers((prevUsers) => [...prevUsers, updatedUser]);
        toast.success("Usuário cadastrado com sucesso!", {
          duration: 3000,
          style: {
            background: "#9ed7a0",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
      } else {
        toast.success("Usuário cadastrado com sucesso, mas nao foi possivel atualizar a lista", {
          duration: 3000,
          style: {
            background: "#9ed7a0",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
      }
    }

    setFormData({
      login: "",
      password: "",
      name: "",
      email: "",
      role: "",
      cpf: "",
      oldPassword: "",
      newPassword: "",
    });
    setEditingId(null);
  } catch (err: any) {
    console.error(err);
    toast.error(err.message || "Erro ao cadastrar/atualizar usuário.", {
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


  // Excluir usuário
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao excluir usuário");

      setUsers((prev) => prev.filter((item) => item.id !== id));
      toast.success("Usuário excluído com sucesso!", {
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
      toast.error("Erro ao excluir usuário.", {
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

  // Editar usuário
  const handleEdit = (user: any) => {
    setFormData({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
      role: user.role,
      cpf: user.cpf,
      oldPassword: "",
      newPassword: "",
    });
    setEditingId(user.id);
  };

  // Atualizar formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
  try {
    const response = await fetch("http://localhost:8080/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({
        login: formData.login,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }),
    });

    const message = await response.text();

    if (!response.ok) throw new Error(message);
    toast.success(message || "Senha alterada com sucesso!", {
      duration: 3000,
      style: {
        background: "#9ed7a0",
        color: "#fff",
        borderRadius: "8px",
        border: "1px solid #fff",
      },
    });
  } catch (err: any) {
    console.error(err);
    toast.error(err.message || "Erro ao alterar senha.", {
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
          <input
            // type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            required
            className="border p-2 rounded text-black"
          />
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
            placeholder="Cargo"
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
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    login: "",
                    password: "",
                    name: "",
                    email: "",
                    role: "",
                    cpf: "",
                    oldPassword: "",
                    newPassword: "",
                  });
                }}
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
