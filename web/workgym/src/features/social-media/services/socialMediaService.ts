import { SocialMedia, SocialMediaFormData } from "../types";

const API_URL = "http://localhost:8080/social-media";

export const fetchSocialMedia = async (token: string | undefined): Promise<SocialMedia[]> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao buscar redes sociais");
  return response.json();
};

export const createSocialMedia = async (socialMediaData: SocialMediaFormData, token: string | undefined): Promise<SocialMedia> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(socialMediaData),
  });
  if (!response.ok) throw new Error("Erro ao criar rede social");
  return response.json();
}

export const updateSocialMedia = async (id: string, socialMediaData: SocialMediaFormData, token: string | undefined): Promise<SocialMedia> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(socialMediaData),
  });
  if (!response.ok) throw new Error("Erro ao atualizar rede social");
  return response.json();
};

export const deleteSocialMedia = async (id: string, token: string | undefined): Promise<void> => {
  if (!token) throw new Error("Token de autenticação não fornecido.");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao excluir rede social");
};