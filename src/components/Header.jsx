import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'react-feather';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-40">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Karia Logo" className="h-12" />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/formulaire" className="text-gray-700 hover:text-orange-600 transition duration-300">Formulaire</Link>
            <Link to="/" className="text-gray-700 hover:text-orange-600 transition duration-300">Accueil</Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition duration-300">À propos</Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition duration-300">Contact</Link>
          </nav>

          {/* Menu Hamburger Mobile */}
          <button
            className="md:hidden text-gray-700 hover:text-orange-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link
                to="/formulaire"
                className="text-gray-700 hover:text-orange-600 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Formulaire
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-orange-600 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-orange-600 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-orange-600 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;