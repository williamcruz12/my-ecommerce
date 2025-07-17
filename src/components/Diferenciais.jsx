import { motion } from "framer-motion";

const features = [
  {
    icon: "⭐",
    title: "Qualidade Premium",
    description: "Produtos selecionados com rigor para garantir o melhor sabor e apresentação.",
  },
  {
    icon: "🎁",
    title: "Embalagem Especial",
    description: "Embalagens bonitas e seguras que preservam o frescor e encantam na entrega.",
  },
  {
    icon: "🚚",
    title: "Frete Rápido",
    description: "Entrega rápida e eficiente para sua comodidade e satisfação.",
  },
  {
    icon: "🤝",
    title: "Atendimento Dedicado",
    description: "Suporte atencioso para tirar dúvidas e ajudar você a qualquer momento.",
  },
];

export default function Diferenciais() {
  return (
    <section
      className="relative z-0 w-full min-h-[220px] sm:min-h-[300px] bg-gradient-to-r from-pink-200 to-amber-900 text-white py-12 px-4 sm:px-12 rounded-t-xl"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-10 text-center leading-snug sm:leading-tight max-w-xl mx-auto">
        Por Que Escolher Nossos Produtos?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 sm:gap-6 max-w-7xl mx-auto text-center">
        {features.map(({ icon, title, description }, i) => (
          <motion.div
            key={title}
            className="bg-white/90 rounded-xl p-6 sm:p-4 flex flex-col items-center justify-center shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl sm:text-5xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-amber-900">{title}</h3>
            <p className="text-amber-900 text-sm sm:text-xs leading-snug sm:leading-snug max-w-xs sm:max-w-full">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
