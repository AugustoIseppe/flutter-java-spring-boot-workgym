import { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import AuthContext from "@/app/authContext";
import { User, UserFormData } from "../types";
import {
    fetchUsers as apiFetchUser,
    createUser as apiCreateUser,
    updateUser as apiUpdateUser,
    deleteUser as apiDeleteUser,
} from "../services/userService";
 
export const useUser = () => {
    const auth = useContext(AuthContext);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<UserFormData>({
        login: "",
        // password: "",
        name: "",
        email: "",
        role: "",
        cpf: "",
    });

    useEffect(() => {
        const loadUsers = async () => {
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
                const data = await apiFetchUser(auth.token);
                setUsers(data);
            } catch (err) {
                console.error(err);
                toast.error("Erro ao buscar usuários.",{
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

        loadUsers();
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
            let updatedUser: User;
            if (editingId) {
                updatedUser = await apiUpdateUser(editingId, formData, auth.token);
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === editingId ? updatedUser : user
                    )
                );
                toast.success("Usuário atualizado com sucesso!", {
                    duration: 3000,
                    style: {
                        background: "#a4ffaf",
                        color: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #fff",
                    },
                });
            } else {
                updatedUser = await apiCreateUser(formData, auth.token);
                setUsers((prevUsers) => [...prevUsers, updatedUser]);
                toast.success("Usuário criado com sucesso!", {
                    duration: 3000,
                    style: {
                        background: "#a4ffaf",
                        color: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #fff",
                    },
                });
            }
            setFormData({
                login: "",
                // password: "",
                name: "",
                email: "",
                role: "",
                cpf: "",
            });
            setEditingId(null);
        } catch (err) {
            console.error(err);
            toast.error("Erro ao salvar usuário.", {
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
        if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

        try {
            await apiDeleteUser(id, auth.token);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            toast.success("Usuário excluído com sucesso!", {
                duration: 3000,
                style: {
                    background: "#a4ffaf",
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

    const handleEdit = (user: User) => {
        setEditingId(user.id);
        setFormData({
            login: user.login,
            // password: user.password,
            name: user.name,
            email: user.email,
            role: user.role,
            cpf: user.cpf,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        });
    }

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({
            login: "",
            // password: "",
            name: "",
            email: "",
            role: "",
            cpf: "",
        });
    };

    return {
        users,
        loading,
        editingId,
        formData,
        handleSubmit,
        handleDelete,
        handleEdit,
        handleChange,
        cancelEdit,
    };

}