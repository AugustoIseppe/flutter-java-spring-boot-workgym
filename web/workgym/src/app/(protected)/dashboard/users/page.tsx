import Pagina from "@/components/template/Pagina";

export default function UsersPage() {
  return (
    <Pagina>
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-2xl font-bold text-zinc-950">Usuários</h1>
        <p className="text-zinc-700">
          Aqui você pode gerenciar os usuários da academia.
        </p>
        {/* Aqui você pode adicionar o componente de tabela de usuários */}
      </div>
    </Pagina>
  );
}
