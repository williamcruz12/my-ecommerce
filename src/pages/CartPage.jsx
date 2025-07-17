import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQuantity, clearCart } from "../utils/cartUtils";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Carrinho() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty >= 1) {
      updateQuantity(id, newQty);
      setCart(getCart());
    }
  };

  const handleClear = () => {
    clearCart();
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-amber-100 relative overflow-hidden">
      {/* Cabeçalho animado */}
      <motion.section
        className="py-16 px-4 shadow-inner bg-gradient-to-r from-pink-100 to-amber-100 rounded-b-3xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 drop-shadow mb-2">
            🛒 Carrinho de Compras
          </h1>
          <p className="text-lg text-amber-800">Revise seus produtos com carinho antes de finalizar</p>
        </div>
      </motion.section>

      {/* Conteúdo */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {cart.length === 0 ? (
            <p className="text-center text-amber-700 text-lg font-medium">Seu carrinho está vazio.</p>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border border-pink-200 bg-white/70 backdrop-blur-md shadow-lg p-4 rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 h-24 rounded object-cover mb-4 sm:mb-0"
                  />
                  <div className="flex-1 sm:ml-4">
                    <h2 className="text-lg font-semibold text-amber-900">{item.name}</h2>
                    <p className="text-sm text-amber-800">Preço: € {item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-pink-100 rounded hover:bg-pink-200"
                      >−</button>
                      <span className="text-amber-900 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-pink-100 rounded hover:bg-pink-200"
                      >+</button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-red-600 hover:underline mt-4 sm:mt-0"
                  >
                    Remover
                  </button>
                </motion.div>
              ))}

              {/* Total e Ações */}
              <div className="text-right mt-10">
                <p className="text-2xl font-bold text-amber-900 mb-4">Total: € {total.toFixed(2)}</p>
                <div className="flex flex-wrap sm:justify-end gap-4">
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 border border-red-400 text-red-600 rounded hover:bg-red-50 transition"
                  >
                    Limpar Carrinho
                  </button>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="px-4 py-2 bg-amber-900 text-white rounded hover:bg-amber-800 transition"
                  >
                    Finalizar Compra
                  </button>
                </div>
                <Link to="/" className="block text-center mt-6 text-sm text-pink-600 hover:underline">
                  ← Continuar comprando
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Botão flutuante Voltar */}
      <motion.div 
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link 
          to="/" 
          className="inline-block px-4 py-2 text-sm font-medium bg-white/70 text-amber-900 rounded-full border border-amber-200 shadow backdrop-blur-md hover:bg-white transition"
        >
          ← Voltar ao Início
        </Link>
      </motion.div>
    </main>
  );
}
