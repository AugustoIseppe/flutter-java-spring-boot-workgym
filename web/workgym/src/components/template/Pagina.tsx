import Cabecalho from "./Cabecalho";
import Menu from "./Menu";
import Rodape from "./Rodape";

export default function Pagina(props: any) {
  return (
    <div className="flex flex-col h-screen bg-white ">
      <Cabecalho />
      <div className="flex-1 flex bg-white text-white">
        <Menu />
        <main className="flex-1">{props.children}</main>
      </div>
      <Rodape />
    </div>
  );
}