"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApp } from "../../providers/AppProvider";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logueado, logout, usuario } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!logueado) router.push("/");
  }, [logueado, router]);

  if (!logueado) return null;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <strong>Administrador de Gastos</strong>
        <span style={{ opacity: 0.7 }}>Usuario: {usuario}</span>

        <nav style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <Link href="/presupuesto">Presupuesto</Link>
          <Link href="/gastos">Gastos</Link>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Salir
          </button>
        </nav>
      </header>

      <hr style={{ margin: "16px 0" }} />

      {children}
    </div>
  );
}
