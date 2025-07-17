import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import OurStory from "../components/OurStory";
import Footer from "../components/Footer";

export default function OurStoryPage() {
  return (
    <main className="bg-pink-50 min-h-screen">
      {/* Breadcrumb e Título */}
      <motion.section
        className="py-14  px-4 md:px-0 bg-gradient-to-r from-pink-100 to-amber-100 shadow-inner"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <motion.div 
            className="text-sm mb-4 text-amber-800 font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
           

           
          </motion.div>

          {/* Título */}
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold text-amber-900 mb-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          > 
          Como tudo começou...
            
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            className="text-lg text-amber-800 "
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Conheça como tudo começou...
          </motion.p>
                {/* Botão voltar */}
      <motion.div 
        className="text-center my-12 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
       
      </motion.div>

        </div>
      </motion.section>

      {/* Conteúdo principal */}
      <OurStory />
       <Link 
          to="/" 
          className=" inline-block px-1 py-1c fixed bottom-1 right-4 text-amber-900/900 rounded-full border  transition backdrop-blur-sm"
        >
          ← Voltar ao Início
        </Link>
      

      {/* Footer */}
      <Footer />
    </main>
  );
}
