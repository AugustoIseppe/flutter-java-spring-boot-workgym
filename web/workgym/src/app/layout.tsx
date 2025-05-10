import type { Metadata } from "next";
import { Abel } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workgyn - Dashboard",
  description: "Gerenciamento de Dados",
};

const font = Abel({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={font.className}>{children}</body>
    </html>
  );
}
