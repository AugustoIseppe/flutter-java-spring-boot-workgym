"use client";

import { useEffect, useState, useContext } from "react";
import AuthContext from "@/app/authContext";
import Pagina from "@/components/template/Pagina";

export default function Page() {
  const auth = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    muscleGroup: "",
    equipment: "",
    image: "",
  });

  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Buscar exercícios
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch("http://localhost:8080/exercises", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar exercícios");

        const data = await res.json();
        setExercises(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao buscar exercícios.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [auth?.token]);

  // Cadastrar ou atualizar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8080/exercises/${editingId}`
      : "http://localhost:8080/exercises";

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

      const updatedExercise = await response.json();

      if (editingId) {
        setExercises((prev) =>
          prev.map((ex) => (ex.id === editingId ? updatedExercise : ex))
        );
        alert("Exercício atualizado!");
      } else {
        setExercises((prev) => [...prev, updatedExercise]);
        alert("Exercício cadastrado!");
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
      alert("Erro ao salvar exercício.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      const res = await fetch(`http://localhost:8080/exercises/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao excluir");

      setExercises((prev) => prev.filter((ex) => ex.id !== id));
      alert("Exercício excluído!");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir.");
    }
  };

  const handleEdit = (ex: any) => {
    setFormData({
      name: ex.name,
      description: ex.description,
      muscleGroup: ex.muscleGroup,
      equipment: ex.equipment,
      image: ex.image,
    });
    setEditingId(ex.id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Pagina>
      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-6 font-sans">
        <h1 className="text-2xl font-bold">
          {editingId ? "Editar Exercício" : "Cadastrar Exercício"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            className="border p-2 rounded text-black"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição"
            className="border p-2 rounded text-black"
          />
          <input
            name="muscleGroup"
            value={formData.muscleGroup}
            onChange={handleChange}
            placeholder="Grupo muscular"
            className="border p-2 rounded text-black"
          />
          <input
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            placeholder="Equipamento"
            className="border p-2 rounded text-black"
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Imagem (opcional)"
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
                    name: "",
                    description: "",
                    muscleGroup: "",
                    equipment: "",
                    image: "",
                  });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

            <div className="flex items-center justify-center w-full h-0.5 bg-gray-300 my-2">
              ______________________________________________________
            </div>
        <h2 className="text-xl font-bold text-zinc-950">Exercícios cadastrados</h2>

        {loading ? (
          <p>Carregando exercícios...</p>
        ) : exercises.length === 0 ? (
          <p>Nenhum exercício cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white  rounded shadow text-sm text-black">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-2 ">Nome</th>
                  <th className="px-4 py-2 ">Descrição</th>
                  <th className="px-4 py-2 ">Grupo Muscular</th>
                  <th className="px-4 py-2 ">Equipamento</th>
                  <th className="px-4 py-2 ">Ações</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((ex, index) => (
                  <tr key={ex.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="px-4 py-2">{ex.name}</td>
                    <td className="px-4 py-2">{ex.description}</td>
                    <td className="px-4 py-2">{ex.muscleGroup}</td>
                    <td className="px-4 py-2">{ex.equipment}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(ex)}
                        className="text-zinc-950 bg-blue-400 px-2 py-1 rounded hover:bg-blue-200 text-xs"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(ex.id)}
                        className="bg-red-300 text-zinc-900 px-2 py-1 rounded hover:bg-red-700 text-xs"
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
