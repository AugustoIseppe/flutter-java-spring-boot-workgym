import { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import AuthContext from "@/app/authContext";
import { SocialMedia, SocialMediaFormData } from "../types";
import {
  fetchSocialMedia as apiFetchSocialMedia,
  createSocialMedia as apiCreateSocialMedia,
  updateSocialMedia as apiUpdateSocialMedia,
  deleteSocialMedia as apiDeleteSocialMedia,
} from "../services/socialMediaService";

export const useSocialMedia = () => {
  const auth = useContext(AuthContext);
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SocialMediaFormData>({
    name: "",
    link: "",
  });

  useEffect(() => {
    const loadSocialMedia = async () => {
      if (!auth?.token) {
        toast.error("Usuário não autenticado.", {
          duration: 3000,
          style: {
            background: "#ffb0ab",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
        setLoading(false);

        return;
      }
      try {
        setLoading(true);
        const data = await apiFetchSocialMedia(auth.token);
        setSocialMedia(data);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao buscar redes sociais.", {
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

    loadSocialMedia();
  }, [auth?.token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth?.token) {
      toast.error("Usuário não autenticado.", {
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

    try {
      let updatedSocialMedia: SocialMedia;
      if (editingId) {
        updatedSocialMedia = await apiUpdateSocialMedia(
          editingId,
          formData,
          auth.token
        );
        setSocialMedia((prev) =>
          prev.map((sm) => (sm.id === editingId ? updatedSocialMedia : sm))
        );
        toast.success("Rede social atualizada com sucesso!", {
          duration: 3000,
          style: {
            background: "#b2f2bb",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
      } else {
        updatedSocialMedia = await apiCreateSocialMedia(formData, auth.token);
        setSocialMedia((prev) => [...prev, updatedSocialMedia]);
        toast.success("Rede social cadastrada com sucesso!", {
          duration: 3000,
          style: {
            background: "#b2f2bb",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #fff",
          },
        });
      }
      setFormData({
        name: "",
        link: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar rede social.", {
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
    if (!auth?.token) {
      toast.error("Usuário não autenticado.", {
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
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      await apiDeleteSocialMedia(id, auth.token);
      setSocialMedia((prev) => prev.filter((sm) => sm.id !== id));
      toast.success("Rede social excluída com sucesso!", {
        duration: 3000,
        style: {
          background: "#b2f2bb",
          color: "#fff",
          borderRadius: "8px",
          border: "1px solid #fff",
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir rede social.", {
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

  const handleEdit = (socialMedia: SocialMedia) => {
    setFormData({
      name: socialMedia.name,
      link: socialMedia.link,
    });
    setEditingId(socialMedia.id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({
        name: "",
        link: "",
        });
    };

    return {
        socialMedia,
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
