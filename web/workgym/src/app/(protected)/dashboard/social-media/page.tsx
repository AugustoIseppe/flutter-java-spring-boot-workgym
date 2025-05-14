"use client";

import { useState, useEffect, useContext } from "react";
import Pagina from "@/components/template/Pagina";
import AuthContext from "@/app/authContext";
import { toast } from "sonner";

export default function SocialMediaPage() {
  const auth = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    link: "",
  });

  const [socialMediaResponse, setSocialMediaResponse] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Buscar redes sociais ao carregar
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const res = await fetch("http://localhost:8080/social-media", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar redes sociais");

        const data = await res.json();
        setSocialMediaResponse(data);
      } catch (err) {
        console.error(err);
        toast.error("Exercício atualizado com sucesso!", {
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

    fetchSocialMedia();
  }, [auth?.token]);

  // Submeter formulário (cadastrar ou atualizar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8080/social-media/${editingId}`
      : "http://localhost:8080/social-media";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao salvar");

      const updatedSocialMedia = await response.json();

      if (editingId) {
        // Atualiza item editado
        setSocialMediaResponse((prev) =>
          prev.map((item) =>
            item.id === updatedSocialMedia.id ? updatedSocialMedia : item
          )
        );
        toast.success("Item atualizado com sucesso", {
          duration: 3000,
          style: {
            background: "#9ed7a0",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
      } else {
        // Adiciona novo item
        setSocialMediaResponse((prev) => [...prev, updatedSocialMedia]);
        toast.success("Item cadastrado com sucesso", {
          duration: 3000,
          style: {
            background: "#9ed7a0",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
      }

      setFormData({ name: "", link: "" });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar", {
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

  // Excluir
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      const res = await fetch(`http://localhost:8080/social-media/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao excluir");

      setSocialMediaResponse((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item excluído com sucesso!", {
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
      toast.error("Erro ao excluir", {
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

  // Editar
  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      link: item.link,
    });
    setEditingId(item.id);
  };

  // Atualizar form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Pagina>
      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-6 font-sans">
        <h1 className="text-2xl font-bold text-zinc-900">Redes Sociais</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded shadow-lg bg-white">
         <h2 className="text-xl font-semibold text-zinc-900">{editingId ? "Editar Rede Social" : "Adicionar Rede Social"}</h2>
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
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: "", link: "" });
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
            {socialMediaResponse.length > 0
              ? `Total de redes sociais: ${socialMediaResponse.length}`
              : "Nenhuma rede social cadastrada."}
          </p>
        </div>

        {loading ? (
          <p>Carregando Redes Sociais...</p>
        ) : socialMediaResponse.length === 0 ? (
          <p>Nenhuma rede social cadastrada.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow text-sm text-black">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">Link</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {socialMediaResponse.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.link}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-200 px-2 py-1 rounded hover:bg-blue-300 text-xs font-bold"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-200 px-2 py-1 rounded hover:bg-red-300 text-xs font-bold"
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
