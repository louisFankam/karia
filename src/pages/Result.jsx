import React, { useState, useEffect} from 'react';
import {
  Briefcase, User, BookOpen,
  ArrowRight, CheckCircle, ExternalLink,
  Download, Share
} from 'react-feather';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
// Données simulées pour la démonstration
const resultats = {
  metiers: [
    {
      id: "dev_web",
      titre: "Développeur Web",
      description: "Crée des sites et applications web modernes et interactifs.",
      match: 92,
      competences: ["HTML/CSS", "JavaScript", "React", "Node.js", "Git"],
      salaire: "400 000 - 1 200 000 FCFA",
      perspectives: "Excellentes, forte demande dans toute l'Afrique",
      secteurs: ["Tech", "E-commerce", "Médias", "Startups"],
    },
    {
      id: "data_analyst",
      titre: "Analyste de Données",
      description: "Analyse les données pour aider les entreprises à prendre des décisions stratégiques.",
      match: 85,
      competences: ["Excel", "SQL", "Python", "Visualisation de données", "Statistiques"],
      salaire: "350 000 - 900 000 FCFA",
      perspectives: "En forte croissance, secteur émergent",
      secteurs: ["Finance", "Télécoms", "Santé", "E-commerce"],
    },
    {
      id: "marketing_digital",
      titre: "Spécialiste en Marketing Digital",
      description: "Développe et exécute des stratégies marketing en ligne pour les entreprises.",
      match: 78,
      competences: ["SEO/SEM", "Réseaux sociaux", "Analyse de données", "Copywriting", "Email marketing"],
      salaire: "300 000 - 800 000 FCFA",
      perspectives: "Très bonnes, demande croissante",
      secteurs: ["Agences", "E-commerce", "Startups", "Grandes entreprises"],
    },
  ],
  parcours: [
    {
      id: "dev_web",
      titre: "Parcours Développeur Web",
      etapes: [
        {
          titre: "Formation de base",
          duree: "6-12 mois",
          description: "Acquérir les fondamentaux du développement web",
          ressources: [
            { nom: "OpenClassrooms - Parcours Développeur Web", url: "#" },
            { nom: "freeCodeCamp", url: "#" },
            { nom: "Codecademy", url: "#" },
          ],
          competences: ["HTML/CSS", "JavaScript", "Responsive Design"],
        },
        {
          titre: "Spécialisation",
          duree: "3-6 mois",
          description: "Se spécialiser dans un framework ou une technologie",
          ressources: [
            { nom: "React Documentation", url: "#" },
            { nom: "Udemy - Cours complet sur React", url: "#" },
            { nom: "MDN Web Docs", url: "#" },
          ],
          competences: ["React", "Node.js", "API REST"],
        },
        {
          titre: "Projets personnels",
          duree: "2-3 mois",
          description: "Construire un portfolio de projets",
          ressources: [
            { nom: "GitHub", url: "#" },
            { nom: "Frontend Mentor", url: "#" },
          ],
          competences: ["Git", "Déploiement", "Portfolio"],
        },
        {
          titre: "Stage ou premier emploi",
          duree: "3-6 mois",
          description: "Acquérir une expérience professionnelle",
          ressources: [
            { nom: "LinkedIn", url: "#" },
            { nom: "Emploi.sn", url: "#" },
          ],
          competences: ["Travail en équipe", "Méthodologies Agile", "Communication"],
        },
      ],
    },
    {
      id: "data_analyst",
      titre: "Parcours Analyste de Données",
      etapes: [
        {
          titre: "Formation de base",
          duree: "6-12 mois",
          description: "Acquérir les fondamentaux de l'analyse de données",
          ressources: [
            { nom: "DataCamp", url: "#" },
            { nom: "Coursera - Google Data Analytics", url: "#" },
          ],
          competences: ["Excel avancé", "SQL", "Statistiques de base"],
        },
        {
          titre: "Apprentissage de Python",
          duree: "3-4 mois",
          description: "Maîtriser Python pour l'analyse de données",
          ressources: [
            { nom: "Python for Data Science Handbook", url: "#" },
            { nom: "Kaggle Learn", url: "#" },
          ],
          competences: ["Python", "Pandas", "NumPy", "Matplotlib"],
        },
        {
          titre: "Projets d'analyse",
          duree: "2-3 mois",
          description: "Réaliser des projets d'analyse de données",
          ressources: [
            { nom: "Kaggle Datasets", url: "#" },
            { nom: "GitHub - Projets open source", url: "#" },
          ],
          competences: ["Nettoyage de données", "Visualisation", "Insights"],
        },
        {
          titre: "Certification et emploi",
          duree: "1-3 mois",
          description: "Obtenir une certification et chercher un emploi",
          ressources: [
            { nom: "Microsoft Power BI Certification", url: "#" },
            { nom: "LinkedIn Learning", url: "#" },
          ],
          competences: ["Power BI", "Tableau", "Communication de données"],
        },
      ],
    },
  ],
  ressources: [
    {
      categorie: "Plateformes d'apprentissage",
      items: [
        { nom: "OpenClassrooms", description: "Plateforme francophone avec parcours certifiants", url: "#" },
        { nom: "Coursera", description: "Cours des meilleures universités mondiales", url: "#" },
        { nom: "Udemy", description: "Cours abordables sur tous les sujets", url: "#" },
      ],
    },
    {
      categorie: "Communautés",
      items: [
        { nom: "AfricArena", description: "Réseau d'entrepreneurs tech africains", url: "#" },
        { nom: "She Code Africa", description: "Communauté de femmes dans la tech", url: "#" },
      ],
    },
  ],
};

const Result = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("metiers");
  const [selectedMetierId, setSelectedMetierId] = useState(resultats.metiers[0].id);

  useEffect(() => {
    // Simule un chargement de 3 secondes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewParcours = (metierId) => {
    setSelectedMetierId(metierId);
    setActiveTab("parcours");
  };

  const selectedParcours = resultats.parcours.find((p) => p.id === selectedMetierId);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="mb-8 text-center">
            <div className="inline-block bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Résultats personnalisés
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Voici les métiers et parcours qui te correspondent
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Basé sur tes réponses, nous avons identifié les métiers et parcours qui correspondent le mieux à ton
              profil, tes compétences et tes aspirations.
            </p>
          </div>

          {/* Onglets */}
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("metiers")}
                className={`flex items-center justify-center px-4 py-2 text-sm font-medium ${activeTab === "metiers" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Métiers
              </button>
              <button
                onClick={() => setActiveTab("parcours")}
                className={`flex items-center justify-center px-4 py-2 text-sm font-medium ${activeTab === "parcours" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                <User className="w-4 h-4 mr-2" />
                Parcours
              </button>
              <button
                onClick={() => setActiveTab("ressources")}
                className={`flex items-center justify-center px-4 py-2 text-sm font-medium ${activeTab === "ressources" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Ressources
              </button>
            </div>
          </div>

          {/* Contenu des onglets */}
          <div className="mb-8">
            {/* Onglet Métiers */}
            {activeTab === "metiers" && (
              <div className="grid gap-6">
                {resultats.metiers.map((metier, index) => (
                  <div
                    key={metier.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden ${index === 0 ? "border-2 border-orange-400" : "border border-gray-200"}`}
                  >
                    {index === 0 && (
                      <div className="bg-orange-400 text-white text-xs font-medium py-1 px-3 text-center">
                        Meilleure correspondance
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{metier.titre}</h3>
                          <p className="text-gray-600 mt-1">{metier.description}</p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${index === 0 ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-800"}`}>
                          {metier.match}% match
                        </span>
                      </div>

                      <div className="mt-6 grid gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Compétences requises</h4>
                          <div className="flex flex-wrap gap-2">
                            {metier.competences.map((competence) => (
                              <span key={competence} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {competence}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Salaire mensuel estimé</h4>
                            <p className="text-gray-600">{metier.salaire}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Perspectives d'emploi</h4>
                            <p className="text-gray-600">{metier.perspectives}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Secteurs d'activité</h4>
                          <div className="flex flex-wrap gap-2">
                            {metier.secteurs.map((secteur) => (
                              <span key={secteur} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 border border-gray-300">
                                {secteur}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-between">
                      <button
                        onClick={() => handleViewParcours(metier.id)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Voir le parcours
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                      <button className="text-sm font-medium text-gray-700 hover:text-orange-600">
                        En savoir plus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Onglet Parcours */}
            {activeTab === "parcours" && selectedParcours && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{selectedParcours.titre}</h3>
                  <p className="text-gray-600 mt-1">
                    Voici le parcours recommandé pour devenir {resultats.metiers[0].titre}
                  </p>

                  <div className="mt-6 space-y-6">
                    {selectedParcours.etapes.map((etape, index) => (
                      <div key={index} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-medium">
                            {index + 1}
                          </div>
                          {index < selectedParcours.etapes.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <h4 className="text-lg font-semibold text-gray-800">{etape.titre}</h4>
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full mb-2">
                            {etape.duree}
                          </span>
                          <p className="text-gray-600 mb-3">{etape.description}</p>

                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Compétences à acquérir</h5>
                            <div className="flex flex-wrap gap-2">
                              {etape.competences.map((competence) => (
                                <span key={competence} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  {competence}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Ressources recommandées</h5>
                            <ul className="space-y-2">
                              {etape.ressources.map((ressource, idx) => (
                                <li key={idx} className="flex items-center">
                                  <a href={ressource.url} className="text-orange-600 hover:underline flex items-center">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    {ressource.nom}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 flex justify-between">
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger en PDF
                  </button>
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Share className="mr-2 h-4 w-4" />
                    Partager
                  </button>
                </div>
              </div>
            )}

            {/* Onglet Ressources */}
            {activeTab === "ressources" && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">Ressources pour ton parcours</h3>
                  <p className="text-gray-600 mt-1">
                    Voici une sélection de ressources pour t'aider dans ton parcours professionnel
                  </p>

                  <div className="mt-6 space-y-8">
                    {resultats.ressources.map((categorie, index) => (
                      <div key={index}>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="w-2 h-6 bg-orange-500 rounded-full mr-2"></span>
                          {categorie.categorie}
                        </h4>

                        <div className="space-y-4">
                          {categorie.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-orange-50 transition-colors"
                            >
                              <div className="bg-orange-100 p-2 rounded-full mr-3">
                                <CheckCircle className="w-4 h-4 text-orange-600" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-800">{item.nom}</h5>
                                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                <a
                                  href={item.url}
                                  className="text-sm text-orange-600 hover:underline flex items-center"
                                >
                                  Visiter
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Prochaines étapes */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Prochaines étapes recommandées</h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                  1
                </span>
                <div>
                  <p className="font-medium">
                    Explore les ressources recommandées pour le métier de {resultats.metiers[0].titre}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Commence par les formations de base pour acquérir les compétences fondamentales.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                  2
                </span>
                <div>
                  <p className="font-medium">Rejoins des communautés professionnelles</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Connecte-toi avec d'autres personnes qui suivent le même parcours pour échanger et apprendre.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                  3
                </span>
                <div>
                  <p className="font-medium">Crée un plan d'action personnalisé</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Établis un calendrier avec des objectifs clairs pour suivre ta progression.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Bouton de retour */}
          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Result;