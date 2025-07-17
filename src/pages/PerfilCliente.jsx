import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PerfilCliente() {
  const [cliente, setCliente] = useState({
    nome: "Camila Fernandes",
    email: "camila@email.com",
    telefone: "+351 912 345 678",
    endereco: "Rua das Flores, 123 - Porto",
  });

  const [editando, setEditando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvar = () => {
    setEditando(false);
    localStorage.setItem("perfilCliente", JSON.stringify(cliente));
  };

  useEffect(() => {
    const salvo = localStorage.getItem("perfilCliente");
    if (salvo) setCliente(JSON.parse(salvo));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-amber-100 py-20 px-4">
      <motion.section
        className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <img
            src="https://source.unsplash.com/120x120/?woman,face"
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto shadow-md"
          />
          <h1 className="text-3xl font-bold text-amber-900 mt-4">Área do Cliente</h1>
          <p className="text-amber-700 text-sm">Gerencie seus dados pessoais</p>
        </div>

        <div className="grid gap-4 text-sm">
          {["nome", "email", "telefone", "endereco"].map((campo) => (
            <div key={campo}>
              <label className="block text-amber-800 font-medium capitalize">
                {campo === "endereco" ? "Endereço de entrega" : campo}
              </label>
              {editando ? (
                <input
                  type="text"
                  name={campo}
                  value={cliente[campo]}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-pink-200 rounded-md"
                />
              ) : (
                <p className="mt-1 text-amber-900">{cliente[campo]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          {editando ? (
            <>
              <button
                onClick={() => setEditando(false)}
                className="px-4 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                className="px-4 py-2 bg-amber-900 text-white rounded hover:bg-amber-800"
              >
                Salvar
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditando(true)}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Editar Perfil
            </button>
          )}
        </div>
      </motion.section>
    </main>
  );
}
