import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Marketing from "./components/Marketing";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";
import OurStory from "./components/OurStory";
import ProductsPage from "./pages/ProductsPage";
import ChefCami from "./components/ChefCami";
import Footer from "./components/Footer";
import OurStoryPage from "./pages/OurStoryPage";
import ChefCamiPage from "./pages/ChefCamiPage";
import HomeProductsPage from "./pages/HomeProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";  // nome consistente
import OrderConfirmation from "./pages/OrderConfirmation";
import Diferenciais from "./components/Diferenciais"; 
import Perfil from "./pages/Perfil";
import PerfilCliente from "./pages/PerfilCliente";


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <>
                <Marketing />
                <FeaturedProducts />
                <Categories />
                <OurStory />
                <ChefCami /> 
                <Diferenciais />
                <Footer />
              </>
            } 
          />
          <Route path="/produtos/:type" element={<ProductsPage />} />
          <Route path="/OurStory" element={<OurStoryPage />} />
          <Route path="/ChefCami" element={<ChefCamiPage />} />
          <Route path="/produtos" element={<HomeProductsPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/pedido-finalizado" element={<OrderConfirmation />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil-cliente" element={<PerfilCliente />} />

        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      {/* Conteúdo com padding-top para não ficar atrás da navbar fixa */}
      <main className="pt-20"> {/* Ajuste aqui o valor se necessário (pt-20 = 5rem = 80px) */}
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  );
}
