import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderConfirmation() {
  const location = useLocation();
  const [orderId, setOrderId] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    setOrderId(id);

    const data = location.state || {};
    setOrderItems(data.cart || []);
    setTotal(data.total || 0);
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto mt-28 p-6 bg-white rounded-xl shadow"
    >
      <h1 className="text-3xl font-bold text-amber-900 mb-4 text-center">
        Compra Concluída!
      </h1>
      <p className="text-center text-amber-800 mb-6">
        Obrigado pela sua compra! Seu pedido foi registrado com o código:
      </p>
      <p className="text-center font-mono text-pink-600 text-lg mb-8">
        #{orderId}
      </p>

      <ul className="space-y-4 mb-6">
        {orderItems.map((item) => (
          <li key={item.id} className="flex items-center gap-4 border-b pb-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h2 className="text-amber-900 font-medium">{item.name}</h2>
              <p className="text-sm text-amber-700">
                €{item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-right text-lg font-bold text-amber-900 mb-6">
        Total Pago: €{total.toFixed(2)}
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="inline-block bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700 transition"
        >
          Voltar à Loja
        </Link>
      </div>
    </motion.div>
  );
}
