import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Solicitud() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    escuela: "",
    uniforme: [] as string[], // ahora es un array
    tunica: "",
    calzado: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      uniforme: isChecked
        ? [...prev.uniforme, value]
        : prev.uniforme.filter((u) => u !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    const datosAGuardar = {
      ...formData,
      uniforme: formData.uniforme.join(", "), // convierte array en string
    };

    const { error } = await supabase
      .from("solicitudes_uniformes")
      .insert([datosAGuardar]);

    if (error) {
      console.error(error);
      setMensaje("❌ Hubo un error al enviar la solicitud.");
    } else {
      setMensaje("✅ Solicitud enviada correctamente.");
      setFormData({
        nombre: "",
        apellido: "",
        escuela: "",
        uniforme: [],
        tunica: "",
        calzado: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Solicitud de Uniforme
        </h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="escuela"
          placeholder="N.º de escuela"
          value={formData.escuela}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        {/* NUEVO: Checkboxes para Cocina y Limpieza */}
        <div className="space-y-2">
          <p className="font-semibold">Uniforme a solicitar</p>
          <label className="block">
            <input
              type="checkbox"
              name="uniforme"
              value="Cocina"
              checked={formData.uniforme.includes("Cocina")}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Cocina
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="uniforme"
              value="Limpieza"
              checked={formData.uniforme.includes("Limpieza")}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Limpieza
          </label>
        </div>

        <select
          name="tunica"
          value={formData.tunica}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        >
          <option value="">Talle de túnica</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="XXXL">XXXL</option>
          <option value="XXXXL">XXXXL</option>
        </select>

        <input
          type="text"
          name="calzado"
          placeholder="Talle de calzado"
          value={formData.calzado}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Enviar solicitud
        </button>

        {mensaje && <p className="text-center text-sm mt-2">{mensaje}</p>}
      </form>
    </div>
  );
}
