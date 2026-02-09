import React from 'react';
import { Heart, Target, Users, Zap, Award, Globe, CheckCircle } from 'react-feather';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  const stats = [
    { value: "10 000+", label: "Jeunes accompagnés" },
    { value: "15+", label: "Pays africains couverts" },
    { value: "500+", label: "Métiers référencés" },
    { value: "92%", label: "Taux de satisfaction" },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion pour l'orientation",
      description: "Nous croyons que chaque jeune mérite de trouver une voie qui lui correspond vraiment.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Excellence",
      description: "Nous utilisons les meilleures technologies d'IA pour fournir des recommandations précises et pertinentes.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Communauté",
      description: "Nous créons un écosystème d'apprentissage et de partage entre jeunes Africains.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "Nous innovons constamment pour rester à la pointe de l'orientation professionnelle.",
    },
  ];

  const features = [
    {
      title: "Analyse approfondie",
      description: "Karia analyse ton profil académique, tes centres d'intérêt, tes compétences et tes aspirations pour te proposer des métiers adaptés.",
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: "Parcours personnalisés",
      description: "Chaque recommandation inclut un parcours de formation détaillé avec des ressources adaptées au contexte africain.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "Ressources locales",
      description: "Nous référençons les formations, communautés et opportunités disponibles en Afrique.",
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos de Karia
            </h1>
            <p className="text-xl md:text-2xl opacity-95">
              Ton guide vers un avenir professionnel épanouissant
            </p>
          </div>
        </div>
      </div>

      {/* Notre Histoire */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre Histoire</h2>
              <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Karia est né d'une constatation simple : chaque année, des millions de jeunes Africains
                se retrouvent perdus face à leur orientation professionnelle. Faute de guidance adaptée,
                beaucoup s'engagent dans des filières qui ne correspondent pas à leurs aspirations ou aux
                réalités du marché du travail africain.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Fondée en 2024, Karia a pour mission de démocratiser l'accès à une orientation de qualité
                pour tous les jeunes Africains. En combinant l'intelligence artificielle avec une profonde
                connaissance des réalités du continent, nous offrons des recommandations personnalisées
                et des parcours concrets adaptés au contexte africain.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Notre équipe est composée d'experts en orientation, de développeurs passionnés et de
                professionnels de l'éducation, tous unis par la même conviction : chaque jeune mérite
                de trouver sa voie, quel que soit son parcours ou ses origines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notre Mission */}
      <div className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Notre Mission</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                "Accompagner chaque jeune Africain vers la découverte d'un parcours professionnel
                épanouissant, en lui donnant les clés pour comprendre ses atouts, explorer les opportunités
                et construire son avenir avec confiance."
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {['Accès pour tous', 'Qualité', 'Innovation', 'Impact'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nos Valeurs */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Valeurs</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment ça marche */}
      <div className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Comment Karia fonctionne</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une approche simple et efficace pour découvrir ta voie
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg shadow-md p-8 h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Impact</h2>
            <p className="opacity-90">Des résultats concrets pour les jeunes Africains</p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Prêt à découvrir ton parcours idéal ?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Rejoins des milliers de jeunes qui ont trouvé leur voie avec Karia
            </p>
            <a
              href="/formulaire"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 transition-colors"
            >
              Commencer le test d'orientation
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
