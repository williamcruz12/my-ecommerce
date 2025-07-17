import { motion } from "framer-motion";
import kamiImg from "../assets/kami.jpg";

export default function ChefCami() {
  const stars = Array.from({ length: 20 }, () => ({
    top: Math.random() * 90 + "%",
    left: Math.random() * 100 + "%",
    size: Math.random() * 3 + 1
  }));

  return (
    <section className="py-6 bg-gradient-to-r from-pink-400 via-pink-300 to-amber-900 rounded-xl relative overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-sm z-0"></div>
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute bg-pink-400 rounded-full z-0"
          style={{ 
            top: star.top, 
            left: star.left, 
            width: `${star.size * 0.5}rem`,
            height: `${star.size * 0.5}rem` 
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <motion.div 
        className="relative max-w-xl mx-auto text-center p-5 rounded-xl bg-white/70 backdrop-blur shadow-2xl hover:scale-105 hover:-rotate-1 transition duration-500"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="relative w-36 h-36 mx-auto mb-4">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.6)] flex items-center justify-center text-[10px] text-pink-600 uppercase tracking-widest"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transformOrigin: "center"
            }}
          >
            Criatividade • Amor • Sabor • Exclusividade •
          </motion.div>
          <img 
            src={kamiImg}
            alt="Chef Cami"
            className="w-36 h-36 rounded-full object-cover shadow-lg relative z-12"
          />
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-2xl font-bold mb-2 text-amber-900"
        >
          Chef Kami
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-amber-900 text-sm leading-relaxed max-w-md mx-auto tracking-wide"
        >
          Apaixonada por confeitaria desde pequena, a Chef Cami transforma ingredientes simples 
          em verdadeiras obras de arte. Cada receita carrega amor, criatividade e um toque de magia 
          para adoçar sua vida.
        </motion.p>
      </motion.div>
    </section>
  );
}
