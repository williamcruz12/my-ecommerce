import { motion } from "framer-motion";
import { FaStar, FaHeart, FaGift } from "react-icons/fa";

export default function Marketing() {
  const icons = [
    { icon: <FaStar />, top: "10%", left: "15%" },
    { icon: <FaHeart />, top: "35%", left: "80%" },
    { icon: <FaGift />, top: "70%", left: "10%" },
    { icon: <FaStar />, top: "60%", left: "60%" },
    { icon: <FaHeart />, top: "20%", left: "65%" },
  ];

  return (
    <motion.section
      className="relative pt-30 bg-gradient-to-br from-pink-500 via-pink-300/80 to-amber-800 text-white py-20 text-center rounded-b-3xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Brilho animado central no fundo */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-3xl animate-pulse z-0"
      />

      {/* Ícones flutuantes */}
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-white/30 text-2xl z-0"
          style={{ top: item.top, left: item.left }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Conteúdo principal */}
      <div className="relative z-10 container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-wide text-white drop-shadow-2xl mb-4">
          Produtos Premium para Você
        </h2>

        <div className="h-1 w-24 mx-auto bg-white/80 rounded-full mb-6"></div>

        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Encontre os melhores produtos artesanais, feitos com carinho e qualidade excepcional.
          Cada detalhe foi pensado para surpreender, encantar e adoçar o seu dia com muito estilo.
        </p>
      </div>
    </motion.section>
  );
}
