import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function HomeProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [categoria, setCategoria] = useState("todos");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        setErro(err.message);
        setLoading(false);
      });
  }, []);

  const categorias = ["todos", "chocolates", "cestas", "kits"];

  const filtrar = (cat) => {
    setCategoria(cat);
    if (cat === "todos") {
      setFiltered(products);
    } else {
      const resultado = products.filter(p => p.categoria === cat);
      setFiltered(resultado);
    }
  };

  return (
    <main className="bg-pink-50 min-h-screen py-12 px-4">
      {/* Título com animação */}
      <motion.h1
        className="text-4xl font-extrabold text-center text-amber-900 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Produtos em Destaque
      </motion.h1>

      {/* Filtros */}
      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => filtrar(cat)}
            className={`px-4 py-2 rounded-full border transition text-sm font-medium
              ${categoria === cat
                ? "bg-pink-600 text-white border-pink-600"
                : "bg-white text-amber-900 border-pink-300 hover:bg-pink-100"}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="max-w-6xl mx-auto">
        {loading && (
          <p className="text-center text-amber-700 font-medium">Carregando produtos...</p>
        )}

        {erro && (
          <p className="text-center text-red-600 font-semibold">Erro: {erro}</p>
        )}

        {!loading && !erro && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.length > 0 ? (
              filtered.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))
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
