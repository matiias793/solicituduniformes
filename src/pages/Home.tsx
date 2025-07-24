import { Link } from "react-router-dom";
import { UserPlus, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">Sistema de Solicitud de Uniformes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-xl">
        {/* Tarjeta 1: Solicitar Uniforme */}
        <Link
          to="/solicitar"
          className="flex flex-col items-center justify-center bg-neutral-800 rounded-xl p-8 hover:bg-neutral-700 transition shadow-lg h-48"
        >
          <UserPlus className="w-14 h-14 text-blue-400 mb-4" />
          <span className="text-lg font-medium">Solicitar Uniforme</span>
        </Link>

        {/* Tarjeta 2: Login Administrador */}
        <Link
          to="/admin-login"
          className="flex flex-col items-center justify-center bg-neutral-800 rounded-xl p-8 hover:bg-neutral-700 transition shadow-lg h-48"
        >
          <ShieldCheck className="w-14 h-14 text-green-400 mb-4" />
          <span className="text-lg font-medium">Login Administrador</span>
        </Link>
      </div>
    </div>
  );
}
