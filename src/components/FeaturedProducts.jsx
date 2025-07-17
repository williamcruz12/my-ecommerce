import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { addToCart } from '../utils/cartUtils';
import chocolateImg from '../assets/choc.jpg';
import cestaImg from '../assets/cesta.jpg';
import chocolate2Img from '../assets/chocolate2.webp';
import buqueImg from '../assets/buque.jpeg';

const featuredProducts = [
  { id: 1, name: 'Chocolate Amargo 70%', price: 20, oldPrice: 30, image: chocolateImg },
  { id: 2, name: 'Cesta Café da Manhã', price: 85, oldPrice: 120, image: cestaImg },
  { id: 3, name: 'Kit Namorados', price: 99, oldPrice: 150, image: chocolate2Img },
  { id: 4, name: 'Buquê Choco-Frutas', price: 70, oldPrice: 95, image: buqueImg },
  { id: 5, name: 'Chocolate Branco Gourmet', price: 28, oldPrice: 38, image: chocolateImg },
];

export default function FeaturedProducts() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [addedMap, setAddedMap] = useState({});

  useEffect(() => {
    const interval = setInterval(() => goTo(activeIndex + 1), 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const goTo = (index) => {
    let next = index;
    if (index >= featuredProducts.length) next = 0;
    if (index < 0) next = featuredProducts.length - 1;

    setActiveIndex(next);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: next * 324, // 300 width + 24 margin/padding (ajuste conforme seu gap)
        behavior: 'smooth',
      });
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedMap(prev => ({ ...prev, [product.id]: true }));
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <motion.section
      className="relative w-full bg-gradient-to-r from-pink-100 via-white to-pink-100 overflow-hidden py-8 px-4 sm:px-6 md:px-12 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className="text-4xl font-extrabold mb-6 text-center text-amber-950">
        Promoções em Destaque
      </h2>
      <div className="w-20 h-1 bg-pink-600 mx-auto mb-8 rounded"></div>

      <div
        ref={carouselRef}
        className="flex space-x-6 overflow-x-auto scroll-smooth cursor-grab active:cursor-grabbing snap-x snap-mandatory scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-pink-100"
        style={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }}
        onScroll={() => {
          if (carouselRef.current) {
            const scrollLeft = carouselRef.current.scrollLeft;
            const widthPerItem = 324; // ajuste conforme seu item + gap
            const idx = Math.round(scrollLeft / widthPerItem);
            setActiveIndex(idx);
          }
        }}
      >
        {featuredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            className="snap-center flex-shrink-0 w-72 bg-white border border-pink-300 rounded-2xl p-4 shadow-md hover:shadow-xl transition-transform hover:scale-105 hover:-rotate-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
              loading="lazy"
            />
            <h3 className="text-xl font-bold mb-2 text-amber-900">{product.name}</h3>
            <div className="mb-6">
              {product.oldPrice && (
                <span className="text-gray-400 line-through mr-2">€{product.oldPrice.toFixed(2)}</span>
              )}
              <span className="text-pink-600 font-bold text-lg">€{product.price.toFixed(2)}</span>
            </div>
            <motion.button
              onClick={() => handleAddToCart(product)}
              className="w-full py-3 rounded text-white font-semibold shadow-lg transition"
              animate={addedMap[product.id] ? { scale: [1, 1.1, 1], backgroundColor: "#22c55e" } : { scale: 1, backgroundColor: "#db2777" }}
              transition={{ duration: 0.3 }}
            >
              {addedMap[product.id] ? "Adicionado!" : "Adicionar ao Carrinho"}
            </motion.button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-3">
        {featuredProducts.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Ir para slide ${idx + 1}`}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full transition-transform cursor-pointer ${
              activeIndex === idx ? 'bg-pink-600 scale-125' : 'bg-pink-300'
            } hover:scale-150`}
          />
        ))}
      </div>
    </motion.section>
  );
}
