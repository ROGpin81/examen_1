"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../providers/AppProvider";

export default function LoginForm() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const { login } = useApp();
  const router = useRouter();

  function onSubmit() {
    const ok = login(user, pass);
    if (!ok) return alert("Credenciales inválidas");
    router.push("/presupuesto");
  }

  return (
    <div style={{ width: 340, border: "1px solid #ddd", padding: 16 }}>
      <h2>Inicio de Sesión</h2>

      <input
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
      <br /><br />

      <input
        placeholder="Clave"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
      <br /><br />

      <button onClick={onSubmit} style={{ width: "100%", padding: 10 }}>
        Entrar
      </button>
    </div>
  );
}
