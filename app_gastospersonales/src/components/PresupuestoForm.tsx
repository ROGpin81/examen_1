"use client";

import { useState } from "react";
import { useApp } from "../providers/AppProvider";

export default function PresupuestoForm() {
  const { presupuesto, setPresupuesto, totalGastado, porcentajeUsado } = useApp();
  const [valor, setValor] = useState(presupuesto ? String(presupuesto) : "");

  function guardar() {
    const n = Number(valor);
    if (isNaN(n) || n <= 0) return alert("Ingrese monto válido");
    setPresupuesto(n);
  }

  const en80 = porcentajeUsado >= 80 && porcentajeUsado <= 100;
  const superado = porcentajeUsado > 100;

  return (
    <div>
      <h2>Presupuesto Mensual</h2>

      <input
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Ej: 15000"
        style={{ padding: 8 }}
      />
      <button onClick={guardar}>Guardar</button>

      <br /><br />

      <p>Presupuesto: L {presupuesto}</p>
      <p>Total gastado: L {totalGastado}</p>
      <p>Uso: {porcentajeUsado.toFixed(1)}%</p>

      {en80 && (
        <div style={{ background: "#fff3cd", padding: 10 }}>
          Has alcanzado el 80%
        </div>
      )}

      {superado && (
        <div style={{ background: "#f8d7da", padding: 10 }}>
          Has superado el presupuesto
        </div>
      )}
    </div>
  );
}
