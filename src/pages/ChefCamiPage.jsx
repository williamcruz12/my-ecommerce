import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ChefCami from "../components/ChefCami";
import Footer from "../components/Footer";

export default function ChefCamiPage() {
  return (
    <main className="bg-pink-50 min-h-screen flex flex-col justify-between">
      
      {/* Cabeçalho com título */}
      <motion.section
        className="py-16 px-4 md:px-0 bg-gradient-to-r from-pink-100 to-amber-100 shadow-inner rounded-b-3xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Breadcrumb (opcional) */}
          <motion.div 
            className="text-sm mb-4 text-amber-800 font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Ex: Home / Chef Kami */}
          </motion.div>

          {/* Título */}
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold text-amber-900 mb-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Conheça a Chef Kami
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            className="text-lg text-amber-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            A artista por trás dos sabores inesquecíveis.
          </motion.p>
        </div>
      </motion.section>

      {/* Componente visual da chef */}
      <ChefCami />

      {/* Botão Voltar */}
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

      {/* Rodapé */}
      <Footer />
    </main>
  );
}
