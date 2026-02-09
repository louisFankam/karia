import React from 'react';

const IntroModal = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-orange-600 text-white p-6 rounded-t-xl text-center">
          <h2 className="text-2xl font-bold">Bienvenue sur Karia !</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-700 leading-relaxed">
              Pour te fournir les recommandations les plus pertinentes, prends le temps de bien remplir chaque champ.
            </p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg mb-6">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Conseil :</span> Pour les champs de description (centres d'intérêt, aspirations, compétences), n'hésite pas à écrire plusieurs phrases. Plus tu en dis, mieux nous te comprendrons !
            </p>
          </div>

          <div className="text-center py-2">
            <p className="text-gray-600 text-sm">
              Durée estimée : <span className="font-semibold">8 à 12 minutes</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
          <button
            onClick={onStart}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all"
          >
            Commencer le test
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
