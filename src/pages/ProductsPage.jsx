import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const { type } = useParams(); // parâmetro da URL
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);

        const cat = type?.toLowerCase();

        if (cat && cat !== "todos") {
          const parts = cat.split("-"); // ex: chocolates-ao-leite-amargo -> ["chocolates", "ao", "leite", "amargo"]
          const mainCategory = parts[0]; // "chocolates"
          const subCategories = parts.slice(1); // ["ao", "leite", "amargo"]

          const filtrados = data.filter((p) => {
            const categoria = p.categoria?.toLowerCase() || "";
            const hasMainCategory = categoria.includes(mainCategory);
            const hasSubCategory =
              subCategories.length === 0
                ? true
                : subCategories.some((sub) => categoria.includes(sub));
            return hasMainCategory && hasSubCategory;
          });

          setFiltered(filtrados);
        } else {
          setFiltered(data);
        }

        setLoading(false);
      })
      .catch((err) => {
        setErro(err.message);
        setLoading(false);
      });
  }, [type]);

  return (
    <main className="bg-pink-50 min-h-screen py-12 px-4">
      <motion.h1
        className="text-4xl font-extrabold text-center text-amber-900 mb-10 capitalize"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {type ? type.replace(/-/g, " ") : "Produtos"}
      </motion.h1>

      <div className="max-w-6xl mx-auto">
        {loading && (
          <p className="text-center text-amber-700 font-medium">
            Carregando produtos...
          </p>
        )}

        {erro && (
          <p className="text-center text-red-600 font-semibold">Erro: {erro}</p>
        )}

        {!loading && !erro && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.length > 0 ? (
              filtered.map((prod) => <ProductCard key={prod.id} product={prod} />)
            ) : (
              <p className="col-span-full text-center text-amber-600 font-medium">
                Nenhum produto encontrado nesta categoria.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
