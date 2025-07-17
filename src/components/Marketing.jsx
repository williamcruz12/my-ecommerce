import { motion } from "framer-motion";
import { FaStar, FaHeart, FaGift } from "react-icons/fa";
import chocImg from "../assets/choc.jpg";

export default function Marketing() {
  const icons = [
    { icon: <FaStar />, top: "10%", left: "15%" },
    { icon: <FaHeart />, top: "35%", left: "80%" },
    { icon: <FaGift />, top: "70%", left: "10%" },
    { icon: <FaStar />, top: "60%", left: "60%" },
    { icon: <FaHeart />, top: "20%", left: "65%" },
  ];

  return (
    <section
      className="
        relative py-16 md:py-24
        bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden
        sm:px-6 px-4
      "
      style={{ backgroundImage: `url(${chocImg})` }}
    >
      {/* Brilho animado central no fundo */}
      <motion.div
        className="
          absolute
          top-1/2 left-1/2
          w-[300px] h-[300px] sm:w-[600px] sm:h-[600px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-pink-200/20
          blur-3xl
          animate-pulse
          z-0
        "
      />

      {/* Ícones flutuantes, escondidos em telas muito pequenas para não poluir */}
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-white/30 text-2xl z-0 hidden sm:block"
          style={{ top: item.top, left: item.left }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-wide text-white drop-shadow-2xl mb-4">
          Produtos Premium para Você
        </h2>

        <div className="h-1 w-20 sm:w-24 mx-auto bg-white/80 rounded-full mb-6"></div>

        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Encontre os melhores produtos artesanais, feitos com carinho e qualidade excepcional.
          Cada detalhe foi pensado para surpreender, encantar e adoçar o seu dia com muito estilo.
        </p>
      </div>
    </section>
  );
}
