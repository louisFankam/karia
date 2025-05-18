import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src={logo} alt="Karia Logo" className="h-12" />
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="formulaire" className="text-gray-700 hover:text-orange-600 transition duration-300">Formulaire</a>
          <a href="home" className="text-gray-700 hover:text-orange-600 transition duration-300">Accueil</a>
          <a href="about" className="text-gray-700 hover:text-orange-600 transition duration-300">À propos</a>
          <a href="contact" className="text-gray-700 hover:text-orange-600 transition duration-300">Contact</a>
        </nav>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition duration-300">Se connecter</button>
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition duration-300">S'inscrire</button>
        </div>
      </div>
    </header>
  );
};

export default Header;