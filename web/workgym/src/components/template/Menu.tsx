import {
  IconArrowsDiff,
  IconBrandProducthunt,
  IconCategory,
  IconCategory2,
  IconError404,
  IconForms,
  IconHome2,
  IconLayout2,
  IconList,
  IconListDetails,
  IconUser,
  IconUserBolt,
  IconUserFilled,
  IconUserHexagon,
} from "@tabler/icons-react";
import MenuItem from "./MenuItem";

export default function Menu() {
  return (
    <aside className="w-75 bg-white p-6 border-r border-zinc-300">
      <nav className="flex flex-col gap-2 text-slate-950">
        {/* texto = Nome | href = rota | icone = icone  */}
        <MenuItem texto="Início" href="/" icone={IconHome2} />
        <hr style={{ border: '1px solid #ccc', margin: '0px 0' }} />
        <h2 style={{ textAlign: 'start', fontWeight: 'bold' }}>Produtos</h2>
        <MenuItem texto="Cadastrar Exercício" icone={IconBrandProducthunt} href="/products-clickhub" />
        <MenuItem texto="Exercícios" icone={IconList} href="/product-list-clickhub" />
        

      </nav>
    </aside>
  );
}
