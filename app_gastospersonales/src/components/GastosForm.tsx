"use client";

import { useState } from "react";
import { useApp } from "../providers/AppProvider";
import type { Gasto } from "../models/Gasto";

export default function GastosForm() {
  const { categorias, agregarCategoria, agregarGasto } = useApp();

  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState(categorias[0] || "");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nuevaCat, setNuevaCat] = useState("");

  async function guardar() {
    const n = Number(monto);
    if (!categoria || isNaN(n) || n <= 0 || !fecha)
      return alert("Complete todos los campos");

    const g: Gasto = {
      categoria,
      monto: n,
      fecha,
      descripcion,
    };

    await agregarGasto(g);

    setMonto("");
    setDescripcion("");
    setFecha("");
  }

  function guardarCategoria() {
    agregarCategoria(nuevaCat);
    setNuevaCat("");
  }

  return (
    <div>
      <h3>Agregar Gasto</h3>

      <input value={monto} onChange={e => setMonto(e.target.value)} placeholder="Monto" />
      <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        {categorias.map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
      <input value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" />

      <button onClick={guardar}>Guardar</button>

      <hr />

      <h4>Nueva Categoría</h4>
      <input value={nuevaCat} onChange={e => setNuevaCat(e.target.value)} />
      <button onClick={guardarCategoria}>Agregar</button>
    </div>
  );
}
