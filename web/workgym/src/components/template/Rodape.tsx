export default function Rodape() {
  return (
    <footer className="flex justify-center bg-gradient-to-r from-zinc-100 via-white to-zinc-100 border-t border-zinc-300 px-6 py-3">
      <span className="text-black text-sm">
        Todos os direitos reservados &copy; {new Date().getFullYear()}
      </span>
      <span className="text-black text-sm ml-2">
        | AIS.IO 
        </span>
    </footer>
  );
}
