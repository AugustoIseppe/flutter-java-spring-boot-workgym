import "./globals.css";
import type { Metadata } from "next";
import { Abel, Inter } from "next/font/google";
import { AuthProvider } from "./authContext";

const abel = Abel ({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-abel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WorkGym - Portal de gestão de treinos e saúde",
  description: "Portal de gestão de treinos e saúde",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={abel.className} cz-shortcut-listen="true">
        <AuthProvider>
          {/* Conteúdo da página será renderizado aqui */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

