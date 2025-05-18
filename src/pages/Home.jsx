import React from 'react';
import Header from '../components/Header';
import { Zap, Compass, BookOpen, Award, ArrowRight } from 'react-feather';
import Footer from '../components/Footer';
import Image from '../assets/image.png';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
          <section className="relative overflow-hidden bg-gradient-to-b from-amber-500 to-orange-600 text-white">
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0 opacity-20"
                style={{ 
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSI+PC9yZWN0PgogIDxwYXRoIGQ9Ik0wIDBMOCA4WiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMiI+PC9wYXRoPgo8L3N2Zz4=')",
            backgroundRepeat: "repeat"
                }}
              ></div>
            </div>

            <div className="container px-4 py-16 mx-auto relative z-10 flex flex-col items-center text-center md:py-24">
              <div className="mb-6 relative w-32 h-32 md:w-40 md:h-40">
                <div className="rounded-full bg-white p-2 w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={Image}
              alt="Karia"
              className="object-cover w-full h-full rounded-full"
            />
                </div>
                <div className="absolute -right-2 -top-2 bg-green-500 rounded-full p-2">
            <Zap className="w-6 h-6 text-white" />
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight mb-4 md:text-6xl">
                Découvre ton <span className="text-yellow-300">avenir</span> avec Karia
              </h1>

              <p className="text-xl mb-8 max-w-2xl text-amber-100 md:text-2xl">
                Trouve ta voie professionnelle idéale en fonction de tes passions, tes talents et tes aspirations.
              </p>

              <a 
                href="/formulaire" 
                className="w-full sm:w-auto inline-block px-8 py-6 bg-white text-orange-600 hover:bg-amber-100 hover:text-orange-700 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Commence ton voyage
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
          </section>

          {/* Features Section */}
        <section className="py-16 px-4 container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Comment Karia t'aide à trouver ta voie</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 flex flex-col items-center text-center">
              <div className="bg-amber-500 p-3 rounded-full mb-4">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Découvre tes talents</h3>
              <p className="text-gray-600">
                Notre formulaire intelligent analyse tes centres d'intérêt et tes compétences pour révéler tes talents
                cachés.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 flex flex-col items-center text-center">
              <div className="bg-orange-500 p-3 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Explore les parcours</h3>
              <p className="text-gray-600">
                Découvre des parcours éducatifs adaptés à ton profil et aux opportunités du marché africain.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-200 flex flex-col items-center text-center">
              <div className="bg-green-500 p-3 rounded-full mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Construis ton avenir</h3>
              <p className="text-gray-600">
                Obtiens une feuille de route claire avec les étapes à suivre pour atteindre tes objectifs
                professionnels.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Ils ont trouvé leur voie avec Karia</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-200 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-orange-600 font-bold">A</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Aminata K.</h3>
                    <p className="text-sm text-gray-500">Sénégal, 22 ans</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Grâce à Karia, j'ai découvert ma passion pour le développement web. Aujourd'hui, je travaille comme
                  freelance et je construis des sites pour des entreprises locales."
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-green-600 font-bold">K</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Kofi M.</h3>
                    <p className="text-sm text-gray-500">Ghana, 19 ans</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "J'étais perdu après le lycée. Karia m'a aidé à identifier mes forces en sciences et m'a orienté vers
                  l'agronomie. Je suis maintenant en formation pour devenir expert en agriculture durable."
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 md:text-4xl">Prêt à découvrir ton potentiel?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-orange-100">
              Rejoins des milliers de jeunes Africains qui ont trouvé leur voie grâce à Karia.
            </p>
            <a 
              href="/formulaire" 
              className="w-full sm:w-auto inline-block px-8 py-6 bg-white text-orange-600 hover:bg-amber-100 hover:text-orange-700 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              Commence ton voyage
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Home;