import {
  IconActivity,
  IconHome2,
  IconRun,
  IconSocial,
  IconUser,
} from "@tabler/icons-react";
import MenuItem from "./MenuItem";

export default function Menu() {
  return (
    <aside className="w-52 bg-gradient-to-b from-zinc-100 via-white to-zinc-100 p-4 border-r border-zinc-300">
      <nav className="flex flex-col gap-2 text-slate-950">
        {/* texto = Nome | href = rota | icone = icone  */}
        <MenuItem texto="Início" href="/dashboard" icone={IconHome2} />
        <hr style={{ border: "1px solid #ccc", margin: "0px 0" }} />
        <MenuItem
          texto="Exercícios"
          icone={IconRun}
          href="/dashboard/exercises"
        />
        <MenuItem
          texto="Usuários"
          icone={IconUser}
          href="/dashboard/users"
        />
        <MenuItem
          texto="Treinos"
          icone={IconActivity}
          href="/dashboard/workouts"
        />
        <MenuItem
          texto="Redes Sociais"
          icone={IconSocial}
          href="/dashboard/social-media"
        />
      </nav>
    </aside>
  );
}
