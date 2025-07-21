import { motion } from "framer-motion";
import { FaStar, FaHeart, FaGift } from "react-icons/fa";
import choc2Img from "../assets/choc2.jpg";

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
        relative min-h-[80vh]
        bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden
        sm:px-6 px-4 flex items-center justify-center
      "
      style={{ backgroundImage: `url(${choc2Img})` }}
    >
      {/* Brilho animado central */}
      <motion.div
        className="
          absolute
          top-1/5 left-1/2
          w-[300px] h-[300px] sm:w-[600px] sm:h-[600px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-pink-200/20
          blur-3xl
          animate-pulse
          z-0
        "
      />

      {/* Ícones animados */}
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

      {/* Botão principal */}
      <div className="relative z-10 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white/90 text-pink-700 font-bold text-xl rounded-full shadow-md hover:bg-white transition"
        >
          Comprar
        </motion.button>
      </div>
    </section>
  );
}
