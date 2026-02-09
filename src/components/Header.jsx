import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/">
            <img src={logo} alt="Karia Logo" className="h-12" />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link to="/formulaire" className="text-gray-700 hover:text-orange-600 transition duration-300">Formulaire</Link>
          <Link to="/" className="text-gray-700 hover:text-orange-600 transition duration-300">Accueil</Link>
          <Link to="/about" className="text-gray-700 hover:text-orange-600 transition duration-300">À propos</Link>
          <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition duration-300">Contact</Link>
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