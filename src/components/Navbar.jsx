import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import logoImg from "../assets/logo.png";
import { getCartCount } from "../utils/cartUtils";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userOpen, setUserOpen] = useState(false);

  const dropdownRefs = useRef({});
  const userRef = useRef();

  // Fecha dropdowns clicando fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdown && dropdownRefs.current[dropdown]) {
        if (!dropdownRefs.current[dropdown].contains(event.target)) {
          setDropdown(null);
        }
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  // Navbar sticky scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Atualiza contador do carrinho
  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount());
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const menus = [
    { label: "Chocolates", key: "chocolates", icon: "🍫", sub: ["ao-leite", "amargo"] },
    { label: "Cestas", key: "cestas", icon: "🧺", sub: ["cafe", "vinho"] },
    { label: "Kit", key: "kits", icon: "🎁", sub: ["namorados", "aniversario"] },
  ];

  function makeCategoryUrl(key, subcats) {
    if (subcats && subcats.length > 0) {
      return `/produtos/${key}-${subcats.join("-")}`;
    }
    return `/produtos/${key}`;
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
      scrolled ? "bg-pink-50/95 shadow-lg py-1" : "bg-pink-50/80 shadow py-2"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Logo" className="h-14 md:h-16 w-auto" />
        </Link>

        {/* Menus desktop */}
        <div className="hidden md:flex items-center space-x-3">
          {menus.map(({ label, key, icon, sub }) => (
            <div key={key} className="relative" ref={(el) => (dropdownRefs.current[key] = el)}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={dropdown === key}
                onClick={() => setDropdown(dropdown === key ? null : key)}
                className="text-amber-900 hover:text-pink-600 font-semibold transition px-2 py-1 text-sm flex items-center gap-1 uppercase"
              >
                <span>{icon}</span> {label}
              </button>
              <AnimatePresence>
                {dropdown === key && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-60 bg-white rounded shadow-lg py-2 z-[9999]"
                  >
                    <Link
                      to={makeCategoryUrl(key, [])}
                      className="block px-4 py-2 text-sm text-amber-900 hover:bg-pink-100 transition capitalize"
                      onClick={() => setDropdown(null)}
                    >
                      Ver todos
                    </Link>
                    {sub.map((subcat) => (
                      <Link
                        key={subcat}
                        to={makeCategoryUrl(key, [subcat])}
                        className="block px-4 py-2 text-sm text-amber-900 hover:bg-pink-100 transition capitalize"
                        onClick={() => setDropdown(null)}
                      >
                        {subcat.replace("-", " ")}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link to="/OurStory" className="text-amber-900 hover:text-pink-600 font-semibold px-2 py-1 text-sm uppercase">
            A nossa História
          </Link>
          <Link to="/ChefCami" className="text-amber-900 hover:text-pink-600 font-semibold px-2 py-1 text-sm uppercase">
            Kami Chef
          </Link>
        </div>

        {/* Botão mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setDropdown(dropdown === "mobile" ? null : "mobile")}
            className="p-2 text-amber-900 hover:text-pink-600"
            aria-label="Abrir menu mobile"
          >
            ☰
          </button>
        </div>

        {/* Ícones Carrinho + Perfil */}
        <div className="flex items-center space-x-3 ml-3">
          {/* Carrinho */}
          <Link to="/carrinho" className="relative p-2 rounded-full bg-amber-900 hover:bg-pink-600 transition" aria-label="Carrinho">
            <ShoppingCartIcon className="h-5 w-5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Perfil dropdown */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="p-2 rounded-full bg-amber-900 hover:bg-pink-600 transition"
              aria-label="Perfil do usuário"
            >
              <UserIcon className="h-5 w-5 text-white" />
            </button>
            <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded z-50 py-2"
                >
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-sm text-amber-900 hover:bg-pink-100 transition"
                    onClick={() => setUserOpen(false)}
                  >
                    Minha Conta
                  </Link>
                  <Link
                    to="/perfil-cliente"
                    className="block px-4 py-2 text-sm text-amber-900 hover:bg-pink-100 transition"
                    onClick={() => setUserOpen(false)}
                  >
                    Dados
                  </Link>
                  <button
                    onClick={() => {
                      alert("Você saiu da conta.");
                      setUserOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    Sair
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Menu mobile dropdown */}
      <AnimatePresence>
        {dropdown === "mobile" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-white z-40 shadow-md px-4 py-3 md:hidden"
          >
            <Link to="/produtos/chocolates" className="block py-2 text-amber-900 hover:text-pink-600">🍫 Chocolates</Link>
            <Link to="/produtos/cestas" className="block py-2 text-amber-900 hover:text-pink-600">🧺 Cestas</Link>
            <Link to="/produtos/kits" className="block py-2 text-amber-900 hover:text-pink-600">🎁 Kits</Link>
            <Link to="/OurStory" className="block py-2 text-amber-900 hover:text-pink-600">A nossa História</Link>
            <Link to="/ChefCami" className="block py-2 text-amber-900 hover:text-pink-600">Kami Chef</Link>
            <Link to="/perfil" className="block py-2 text-amber-900 hover:text-pink-600">👤 Perfil</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
