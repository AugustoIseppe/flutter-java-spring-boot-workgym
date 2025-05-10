import Image from "next/image";
import Pagina from "@/components/template/Pagina";

export default function Home() {
  return (
    <Pagina>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4 text-cyan-950">Bem-vindo ao WorkGym!</h1>
        <Image
          src="/workgym-logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="logo-clickhub-homepage elevation-3"
        />
      </div>
    </Pagina>
  );
}
