import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ProdutosCategoria() {
  const { categoria } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => {
        if (!categoria || categoria.toLowerCase() === "todos") {
          setProdutos(data);
        } else {
          const subcats = categoria.toLowerCase().split("-");
          const filtered = data.filter(prod =>
            subcats.some(subcat => prod.categoria.toLowerCase().includes(subcat))
          );
          setProdutos(filtered);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar produtos:", err);
        setLoading(false);
      });
  }, [categoria]);

  return (
    <div className="px-4 py-20 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-amber-900 mb-8">
        Categoria: {categoria}
      </h1>

      {loading ? (
        <p className="text-center text-amber-800">Carregando produtos...</p>
      ) : produtos.length === 0 ? (
        <p className="text-center text-amber-800">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produtos.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
