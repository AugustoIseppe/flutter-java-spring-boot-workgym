import { IconBrandReact } from "@tabler/icons-react";

export default function Cabecalho() {
  return (
    <header className="flex justify-center items-center bg-white border-b px-6 py-3 gap-2">
      <div className="flex items-center gap-2">
        <IconBrandReact size={36} stroke={1} className="text-blue-800" />
        <span className="font-bold text-slate-950">Workgym - Portal de Gerenciamento da Academia</span>
      </div>
      {/* <div className="flex justify-center items-center font-bold bg-purple-600 w-11 h-11 rounded-full">
        US
      </div> */}
    </header>
  );
}
