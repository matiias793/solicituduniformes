import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Search, FileDown } from "lucide-react";


export default function AdminPanel() {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEscuela, setFiltroEscuela] = useState("");
  const [filtradas, setFiltradas] = useState<any[]>([]);

  useEffect(() => {
    const autenticado = localStorage.getItem("adminAutenticado");
    if (autenticado !== "true") {
      navigate("/admin-login");
      return;
    }

    const cargarSolicitudes = async () => {
      const { data, error } = await supabase
        .from("solicitudes_uniformes")
        .select("*")
        .order("creado_en", { ascending: false });

      if (error) {
        console.error("Error al cargar las solicitudes:", error.message);
      } else {
        setSolicitudes(data);
        setFiltradas(data);
      }

      setLoading(false);
    };

    cargarSolicitudes();
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("adminAutenticado");
    navigate("/");
  };

  const filtrarPorEscuela = () => {
    const resultado = solicitudes.filter((s) =>
      s.escuela.toLowerCase().includes(filtroEscuela.toLowerCase())
    );
    setFiltradas(resultado);
  };

  const exportarExcel = () => {
    alert("📦 Exportar a Excel (a implementar)");
  };

  const exportarPDF = () => {
    alert("🧾 Exportar a PDF (a implementar)");
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <button
          onClick={cerrarSesion}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Filtros y exportar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="flex items-center bg-white rounded-lg overflow-hidden w-full md:w-72">
          <input
            type="text"
            placeholder="N° de escuela"
            value={filtroEscuela}
            onChange={(e) => setFiltroEscuela(e.target.value)}
            className="w-full px-3 py-2 text-black focus:outline-none"
          />
          <button
            onClick={filtrarPorEscuela}
            className="bg-neutral-800 px-4 py-2 hover:bg-neutral-700 flex items-center justify-center"
          >
            <Search className="text-white w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportarPDF}
            className="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-lg hover:bg-neutral-700 transition"
          >
            <FileDown className="w-5 h-5" />
            <span>PDF</span>
          </button>
          <button
            onClick={exportarExcel}
            className="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-lg hover:bg-neutral-700 transition"
          >
            <FileDown className="w-5 h-5" />
            <span>Excel</span>
          </button>
        </div>
      </div>

      {/* Tabla */}
      {loading ? (
        <p className="text-center text-gray-400">Cargando solicitudes...</p>
      ) : filtradas.length === 0 ? (
        <p className="text-center text-gray-400">No hay solicitudes para esa escuela.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-neutral-800 text-white uppercase">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Apellido</th>
                <th className="px-4 py-3">Escuela</th>
                <th className="px-4 py-3">Uniforme</th>
                <th className="px-4 py-3">Túnica</th>
                <th className="px-4 py-3">Calzado</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="bg-neutral-900">
              {filtradas.map((s) => (
                <tr key={s.id} className="border-t border-gray-700 hover:bg-neutral-800">
                  <td className="px-4 py-2">{s.nombre}</td>
                  <td className="px-4 py-2">{s.apellido}</td>
                  <td className="px-4 py-2">{s.escuela}</td>
                  <td className="px-4 py-2">{s.uniforme}</td>
                  <td className="px-4 py-2">{s.tunica}</td>
                  <td className="px-4 py-2">{s.calzado}</td>
                  <td className="px-4 py-2">
                    {new Date(s.creado_en).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
