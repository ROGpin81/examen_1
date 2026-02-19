import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "../providers/AppProvider";

export const metadata: Metadata = {
  title: "Administrador de Gastos",
  description: "Examen Primer Parcial - Desarrollo Web II",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
