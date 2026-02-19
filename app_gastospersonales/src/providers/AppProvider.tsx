"use client";

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import type { Gasto } from "../models/Gasto";

type Props = { children: React.ReactNode };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

export default function AppProvider({ children }: Props) {
  
  const [logueado, setLogueado] = useState(false);
  const [usuario, setUsuario] = useState("");

  function login(user: string, pass: string) {
    const ok = user === "admin" && pass === "admin123";

    if (ok) {
      setLogueado(true);
      setUsuario(user);
      return true;
    }

    return false;
  }

  function logout() {
    setLogueado(false);
    setUsuario("");
    setGastos([]); 
  }

  const [presupuesto, setPresupuestoState] = useState<number>(0);

  function setPresupuesto(monto: number) {
    setPresupuestoState(monto);
  }

  const [categorias, setCategorias] = useState<string[]>([
    "Comida",
    "Transporte",
    "Entretenimiento",
  ]);

  function agregarCategoria(nombre: string) {
    const limpio = nombre.trim();
    if (!limpio) return;

    const existe = categorias.some(
      (c) => c.toLowerCase() === limpio.toLowerCase()
    );
    if (existe) return;

    setCategorias([...categorias, limpio]);
  }

  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [cargandoGastos, setCargandoGastos] = useState(false);

  async function cargarGastos() {
    try {
      setCargandoGastos(true);

      const resp = await fetch(`${API_URL}/gasto`);
      const data = await resp.json();

      setGastos(data);
    } catch (error) {
      console.log(error);
      alert("Error cargando gastos");
    } finally {
      setCargandoGastos(false);
    }
  }

  async function agregarGasto(g: Gasto) {
    const body = {
      categoria: g.categoria,
      monto: g.monto,
      fecha: g.fecha,
    };

    try {
      const resp = await fetch(`${API_URL}/gasto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        alert("No se pudo guardar el gasto");
        return;
      }

      await cargarGastos();
    } catch (error) {
      console.log(error);
      alert("Error agregando gasto");
    }
  }

  useEffect(() => {
    if (logueado) {
      cargarGastos();
    } else {
      setGastos([]);
    }
  }, [logueado]);

  const totalGastado = gastos.reduce((acc, g) => {
    return acc + Number(g.monto || 0);
  }, 0);

  let porcentajeUsado = 0;
  if (presupuesto > 0) {
    porcentajeUsado = (totalGastado / presupuesto) * 100;
  }

  return (
    <AppContext.Provider
      value={{
        logueado,
        usuario,
        login,
        logout,

        presupuesto,
        setPresupuesto,

        categorias,
        agregarCategoria,

        gastos,
        cargandoGastos,
        cargarGastos,
        agregarGasto,

        totalGastado,
        porcentajeUsado,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
