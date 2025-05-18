import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Brand and description */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Karia</h2>
            <p className="text-gray-600">
              Aide les jeunes Africains à découvrir leur parcours professionnel idéal en fonction de leurs centres d'intérêt et compétences.
            </p>
          </div>

          {/* Navigation links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-600 transition">Accueil</a></li>
              <li><a href="#" className="hover:text-orange-600 transition">Formulaire</a></li>
              <li><a href="#" className="hover:text-orange-600 transition">À propos</a></li>
              <li><a href="#" className="hover:text-orange-600 transition">Contact</a></li>
            </ul>
          </div>

          {/* Resources links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-600 transition">Blog</a></li>
              <li><a href="#" className="hover:text-orange-600 transition">Guides</a></li>
              <li><a href="#" className="hover:text-orange-600 transition">Témoignages</a></li>
              <li><a href="#" className="hover:text-orange-600 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-600 transition">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:text-orange-600 transition">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-orange-600 transition">Mentions légales</a></li>
              <li><a href="#" className="hover:text-orange-600 transition">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>© 2025 Karia. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;