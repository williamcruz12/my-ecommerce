import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-pink-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Logo / Marca */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-pink-400 mb-2 tracking-wide">ChokoKa</h2>
          <p className="text-pink-300 text-sm leading-relaxed">
            Sabor e criatividade<br />em cada detalhe.
          </p>
        </div>

        {/* Newsletter */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3 uppercase text-pink-200">Receba novidades</h3>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <input 
              type="email" 
              placeholder="Seu email"
              className="px-3 py-2 rounded bg-pink-50 text-amber-900 w-full sm:w-auto text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button 
              type="submit"
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition w-full sm:w-auto"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Redes sociais e Links */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex space-x-4">
            <a href="#" className="text-pink-400 hover:text-pink-600 transition text-2xl" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="text-pink-400 hover:text-pink-600 transition text-2xl" aria-label="Whatsapp">
              <FaWhatsapp />
            </a>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-3 text-sm text-pink-300">
            <a href="#sobre" className="hover:text-pink-500 transition">Sobre</a>
            <a href="#produtos" className="hover:text-pink-500 transition">Produtos</a>
            <a href="#contato" className="hover:text-pink-500 transition">Contato</a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-pink-400 text-xs">
        &copy; {new Date().getFullYear()} <strong>ChokoKa</strong>. Todos os direitos reservados.
      </div>
    </footer>
  );
}
