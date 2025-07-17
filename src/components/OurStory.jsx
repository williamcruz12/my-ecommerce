import { motion } from "framer-motion";
import chocImg from "../assets/choc.jpg";

export default function OurStory() {
  return (
    <section 
      className="relative py-20 md:py-20 bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden"
      style={{ backgroundImage: `url(${chocImg})` }}
    >
      {/* Sobreposição para escurecer e destacar texto */}
      <div className="absolute inset-0 bg-pink-100/30 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-w-screen-lg">
        
        {/* Texto */}
        <motion.div 
          className="flex-1 max-w-prose text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="text-4xl font-extrabold mb-4 text-amber-950">
            A nossa história
          </h2>
          <div className="w-24 h-1 bg-pink-600 mb-6 rounded mx-auto md:mx-0"></div>
          <p className="text-gray-950 leading-relaxed text-lg">
            Tudo começou com uma pequena cozinha e o amor pelos chocolates artesanais.
            Com o tempo, fomos crescendo, conquistando corações e levando sabor a cada detalhe.
            Hoje somos referência em produtos premium, cestas especiais e kits personalizados.
          </p>
        </motion.div>

        {/* Imagem */}
        <motion.div 
          className="flex-1 relative group"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="w-48 h-48 md:w-60 md:h-60 rounded-full border-4 border-pink-400 overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 mx-auto md:mx-0">
            <img 
              src={chocImg}
              alt="Nossa história"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
