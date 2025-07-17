import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Perfil() {
  const [activeTab, setActiveTab] = useState("dados");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você pode limpar token/cookies
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-100 p-6">
      <motion.div
        className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Lateral */}
        <aside className="w-full md:w-1/3 bg-pink-100 p-6 flex flex-col items-center space-y-6 text-center">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt="Foto do usuário"
            className="w-24 h-24 rounded-full object-cover shadow"
          />
          <h2 className="text-lg font-bold text-amber-900">Olá, Cliente!</h2>
          <nav className="w-full space-y-2 text-sm">
            {[
              { id: "dados", label: "Dados Pessoais" },
              { id: "pedidos", label: "Histórico de Pedidos" },
              { id: "senha", label: "Trocar Senha" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-4 py-2 rounded text-left ${
                  activeTab === tab.id
                    ? "bg-pink-600 text-white"
                    : "hover:bg-pink-200 text-pink-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full mt-4 px-4 py-2 text-red-600 hover:bg-red-100 rounded text-left"
            >
              Sair da Conta
            </button>
          </nav>
        </aside>

        {/* Conteúdo */}
        <section className="flex-1 p-8">
          {activeTab === "dados" && (
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                👤 Seus Dados
              </h3>
              <p className="text-amber-800 mb-2">Nome: Cliente Exemplo</p>
              <p className="text-amber-800">Email: cliente@email.com</p>
            </div>
          )}

          {activeTab === "pedidos" && (
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                📦 Histórico de Pedidos
              </h3>
              <ul className="space-y-4">
                <li className="p-4 bg-white rounded shadow text-sm text-amber-800">
                  Pedido #0001 – Entregue – €85,00
                </li>
                <li className="p-4 bg-white rounded shadow text-sm text-amber-800">
                  Pedido #0002 – A Caminho – €42,00
                </li>
              </ul>
            </div>
          )}

          {activeTab === "senha" && (
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                🔐 Alterar Senha
              </h3>
              <form className="space-y-4 max-w-sm">
                <input
                  type="password"
                  placeholder="Senha atual"
                  className="w-full p-2 rounded border"
                />
                <input
                  type="password"
                  placeholder="Nova senha"
                  className="w-full p-2 rounded border"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                >
                  Atualizar Senha
                </button>
              </form>
            </div>
          )}
        </section>
      </motion.div>

      {/* Botão flutuante Voltar */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link
          to="/"
          className="inline-block px-4 py-2 text-sm font-medium bg-white/70 text-amber-900 rounded-full border border-amber-200 shadow backdrop-blur-md hover:bg-white transition"
        >
          ← Voltar ao Início
        </Link>
      </motion.div>
    </main>
  );
}
