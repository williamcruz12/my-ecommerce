import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar produtos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">
          Produtos em Destaque
        </h1>

        {loading ? (
          <p className="text-center text-amber-800">Carregando produtos...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-amber-800">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
