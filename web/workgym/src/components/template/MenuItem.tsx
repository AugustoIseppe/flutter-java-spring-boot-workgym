import Link from "next/link";

interface MenuItemProps {
  icone?: any;
  texto: string;
  href: string;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <div className="flex items-center gap-1 p-1 hover:bg-black/5 rounded-md transition duration-200">
      <props.icone size={22} stroke={1.5}/>
      <Link href={props.href} className="text-sm text-zinc-950 font-extrabold ">
        {props.texto}
      </Link>
    </div>
  );
}
