import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCart, clearCart } from "../utils/cartUtils";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const currentCart = getCart();

    if (!currentCart || currentCart.length === 0) {
      navigate("/"); // Evita continuar se não há produtos
      return;
    }

    const totalPrice = currentCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setCart(currentCart);
    setTotal(totalPrice);

    setTimeout(() => {
      clearCart();
    }, 100);
  }, [navigate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-amber-100 py-20 px-4 flex items-center justify-center">
      <motion.div
        className="w-full max-w-3xl bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-amber-900 mb-2">
            🎉 Pedido Confirmado!
          </h1>
          <p className="text-amber-800 text-lg">
            Veja abaixo os detalhes da sua compra:
          </p>
        </div>

        <ul className="space-y-4 mb-8">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 bg-white rounded-xl shadow p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded shadow"
              />
              <div className="flex-1">
                <h2 className="text-amber-900 font-semibold">{item.name}</h2>
                <p className="text-sm text-amber-700">
                  €{item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <p className="text-pink-600 font-bold">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <div className="text-right text-lg font-bold text-amber-900 mb-6">
          Total Pago: €{total.toFixed(2)}
        </div>

        <div className="text-center">
          <button
            onClick={() =>
              navigate("/pedido-finalizado", {
                state: { cart, total },
              })
            }
            className="bg-pink-600 text-white px-6 py-3 rounded-full shadow hover:bg-pink-700 transition"
          >
            Ver Detalhes do Pedido
          </button>
        </div>
      </motion.div>
    </main>
  );
}
