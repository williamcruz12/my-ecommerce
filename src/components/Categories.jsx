import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const categories = [
  {
    type: "chocolates-ao-leite-amargo", // alterado aqui para subcategorias juntas
    title: "Chocolates",
    image: "https://source.unsplash.com/400x300/?chocolates",
  },
  {
    type: "cestas",
    title: "Cestas",
    image: "https://source.unsplash.com/400x300/?breakfast",
  },
  {
    type: "kits",
    title: "Kits",
    image: "https://source.unsplash.com/400x300/?gift",
  },
  {
    type: "buques",
    title: "Buquê de Chocolate com Frutas",
    image: "https://source.unsplash.com/400x300/?fruit-bouquet",
  },
];

export default function Categories() {
  return (
    <section className="w-full bg-gradient-to-r from-pink-100 via-white to-pink-100 py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-amber-950">
        Catálogo de Produtos
      </h2>
      <div className="w-24 h-1 bg-pink-600 mx-auto mb-12 rounded"></div>

      {/* Lista vertical em mobile, grid em md+ */}
      <div className="flex flex-col space-y-6 md:grid md:grid-cols-4 md:gap-8 md:space-y-0">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.type}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -10, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white rounded-2xl shadow"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full aspect-video object-cover rounded-t-2xl"
            />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold mb-4 text-amber-900">{cat.title}</h3>
              <Link
                to={`/produtos/${cat.type}`}
                className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-pink-700 text-white px-5 py-2.5 rounded-full hover:from-pink-600 hover:to-pink-800 transition-all duration-300"
              >
                Ver Catálogo
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
