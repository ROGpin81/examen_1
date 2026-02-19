import { createContext } from "react";
import type { Gasto } from "../models/Gasto";

export type AppContextType = {
  logueado: boolean;
  usuario: string;
  login: (usuario: string, clave: string) => boolean;
  logout: () => void;

  presupuesto: number;
  setPresupuesto: (monto: number) => void;

  categorias: string[];
  agregarCategoria: (nombre: string) => void;

  gastos: Gasto[];
  cargandoGastos: boolean;
  cargarGastos: () => Promise<void>;
  agregarGasto: (g: Gasto) => Promise<void>;

  totalGastado: number;
  porcentajeUsado: number;
};

export const AppContext = createContext<AppContextType>({
  logueado: false,
  usuario: "",
  login: () => false,
  logout: () => {},

  presupuesto: 0,
  setPresupuesto: () => {},

  categorias: [],
  agregarCategoria: () => {},

  gastos: [],
  cargandoGastos: false,
  cargarGastos: async () => {},
  agregarGasto: async () => {},

  totalGastado: 0,
  porcentajeUsado: 0,
});
