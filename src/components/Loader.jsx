import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  // Animation de l'ampoule qui pulse
  const bulbVariants = {
    initial: { opacity: 0.6, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  // Animation des particules lumineuses
  const particleVariants = {
    initial: { opacity: 0 },
    animate: (i) => ({
      opacity: [0, 0.8, 0],
      y: [0, -20, 0],
      transition: {
        delay: i * 0.2,
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
      {/* Conteneur principal */}
      <div className="text-center">
        {/* Ampoule animée */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={bulbVariants}
          className="relative mb-8"
        >
          {/* Filament de l'ampoule */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-400 rounded-full"></div>
          
          {/* Ampoule (partie en verre) */}
          <div className="w-24 h-24 bg-orange-100 rounded-full border-4 border-orange-300 flex items-center justify-center">
            {/* Reflet */}
            <div className="w-6 h-6 bg-white bg-opacity-40 rounded-full absolute top-6 right-6"></div>
            
            {/* Particules lumineuses */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="initial"
                animate="animate"
                variants={particleVariants}
                className={`absolute w-2 h-2 rounded-full bg-orange-400`}
                style={{
                  left: `${Math.random() * 40 + 30}px`,
                  top: `${Math.random() * 40 + 30}px`
                }}
              />
            ))}
          </div>
          
          {/* Base de l'ampoule */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-orange-300 rounded-b-full"></div>
        </motion.div>

        {/* Texte de chargement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Analyse en cours...
          </h2>
          <p className="text-gray-600">
            Nous identifions les meilleurs métiers pour toi
          </p>
          
          {/* Barre de progression animée */}
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mt-6 mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;