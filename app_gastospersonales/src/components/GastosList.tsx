"use client";

import { useApp } from "../providers/AppProvider";

export default function GastosList() {
  const { gastos, cargarGastos, cargandoGastos } = useApp();

  return (
    <div>
      <h3>Listado de Gastos</h3>
      <button onClick={cargarGastos}>Refrescar</button>

      {cargandoGastos ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {gastos.map((g) => (
            <li key={g.idgasto}>
              {g.fecha} - {g.categoria} - L {g.monto}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
