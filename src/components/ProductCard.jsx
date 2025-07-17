import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { addToCart } from "../utils/cartUtils";

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [added, setAdded] = useState(false);

  const formatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {/* CARD DO PRODUTO */}
      <div className="border rounded-xl p-4 bg-pink-50 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition duration-300">
        <div onClick={() => setShowModal(true)} className="cursor-pointer">
          <div className="w-full aspect-[4/3] overflow-hidden rounded">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition duration-300"
            />
          </div>

          <h2 className="text-xl font-semibold text-amber-900 mt-4 line-clamp-2 text-balance">
            {product.name}
          </h2>

          <div className="mt-2 mb-4 flex items-center gap-2">
            {product.oldPrice && (
              <span className="text-sm text-amber-700 line-through">
                {formatter.format(product.oldPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-amber-900">
              {formatter.format(product.price)}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          aria-label="Adicionar ao carrinho"
          className="w-full py-2 mt-2 bg-amber-900 text-white rounded hover:bg-pink-600 transition font-medium"
        >
          {added ? "Adicionado!" : "Adicionar ao Carrinho"}
        </button>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* FUNDO */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowModal(false)}
            />

            {/* CONTEÚDO */}
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="fixed z-50 w-11/12 max-w-md bg-white p-6 rounded-xl shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Confirma Compra?
              </h3>
              <p className="text-amber-800 mb-6 leading-relaxed">
                Você está prestes a adicionar{" "}
                <strong className="text-amber-900">{product.name}</strong> por{" "}
                <strong className="text-amber-900">
                  {formatter.format(product.price)}
                </strong>
                .
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleAddToCart();
                    setShowModal(false);
                  }}
                  className="flex-1 py-2 bg-amber-900 text-white rounded hover:bg-amber-800 transition font-semibold"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border border-amber-300 text-amber-700 rounded hover:bg-amber-50 transition font-medium"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
