import React, { useState, useEffect } from 'react';
import {
  Briefcase, User, BookOpen,
  ArrowRight, CheckCircle, ExternalLink,
  Download, Share
} from 'react-feather';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const Result = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("metiers");
  const [selectedMetierId, setSelectedMetierId] = useState("");
  const [resultats, setResultats] = useState(null);

  useEffect(() => {
    // Récupérer les résultats depuis localStorage
    const storedResults = localStorage.getItem('kariaResults');

    if (!storedResults) {
      // Aucun résultat trouvé, rediriger vers le formulaire
      navigate('/formulaire');
      return;
    }

    try {
      const parsedResults = JSON.parse(storedResults);

      // Validation basique de la structure
      if (!parsedResults.metiers || !Array.isArray(parsedResults.metiers) || parsedResults.metiers.length === 0) {
        navigate('/formulaire');
        return;
      }

      setResultats(parsedResults);
      setSelectedMetierId(parsedResults.metiers[0].id);

      // Loader plus court car les données sont déjà chargées
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Erreur lors de la lecture des résultats:", error);
      navigate('/formulaire');
    }
  }, [navigate]);

  const handleViewParcours = (metierId) => {
    setSelectedMetierId(metierId);
    setActiveTab("parcours");
  };

  const handleDownloadPDF = () => {
    if (!resultats || !resultats.metiers || resultats.metiers.length === 0) return;

    const doc = new jsPDF();
    const metier = resultats.metiers[0]; // Meilleure correspondance
    const parcours = resultats.parcours?.find((p) => p.id === metier.id);

    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);

    // Couleurs
    const primaryColor = [249, 115, 22]; // Orange
    const textColor = [55, 65, 81]; // Gray
    const lightGray = [243, 244, 246];

    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Karia', margin, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Ton parcours professionnel personnalisé', margin, 30);

    yPosition = 55;

    // Date
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, margin, yPosition);
    yPosition += 15;

    // Métier recommandé
    doc.setFillColor(...lightGray);
    doc.rect(margin, yPosition, maxWidth, 12, 'F');

    doc.setTextColor(...primaryColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Métier recommandé', margin + 5, yPosition + 8);
    yPosition += 20;

    // Titre du métier
    doc.setTextColor(...textColor);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(metier.titre, margin, yPosition);
    yPosition += 10;

    // Match percentage
    doc.setFillColor(...primaryColor);
    doc.circle(margin + 5, yPosition + 3, 5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`${metier.match}%`, margin + 5, yPosition + 6, { align: 'center' });

    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('de correspondance avec votre profil', margin + 15, yPosition + 6);
    yPosition += 15;

    // Description
    const descriptionLines = doc.splitTextToSize(metier.description, maxWidth);
    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.text(descriptionLines, margin, yPosition);
    yPosition += descriptionLines.length * 7 + 10;

    // Compétences
    doc.setFillColor(...lightGray);
    doc.rect(margin, yPosition, maxWidth, 12, 'F');

    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Compétences requises', margin + 5, yPosition + 8);
    yPosition += 20;

    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');

    metier.competences.forEach((competence) => {
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, yPosition, maxWidth, 8, 2, 2, 'S');
      doc.text(`• ${competence}`, margin + 8, yPosition + 5);
      yPosition += 12;
    });
    yPosition += 5;

    // Salaire et perspectives
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text('Salaire et perspectives', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textColor);
    doc.text(`Salaire mensuel estimé : ${metier.salaire}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Perspectives d'emploi : ${metier.perspectives}`, margin, yPosition);
    yPosition += 15;

    // Nouvelle page pour le parcours
    doc.addPage();

    // Header parcours
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Parcours de formation recommandé', margin, 20);

    yPosition = 45;

    if (parcours && parcours.etapes) {
      parcours.etapes.forEach((etape, index) => {
        // Vérifier si on doit changer de page
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }

        // Numéro d'étape
        doc.setFillColor(...primaryColor);
        doc.circle(margin + 10, yPosition, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}`, margin + 10, yPosition + 5, { align: 'center' });

        // Titre de l'étape
        doc.setTextColor(...textColor);
        doc.setFontSize(14);
        doc.text(etape.titre, margin + 30, yPosition + 5);
        yPosition += 15;

        // Durée
        doc.setFontSize(11);
        doc.setFont('helvetica', 'italic');
        doc.setFillColor(243, 244, 246);
        doc.rect(margin + 30, yPosition - 5, 50, 8, 'F');
        doc.text(etape.duree, margin + 35, yPosition);
        yPosition += 10;

        // Description
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(etape.description, maxWidth - 30);
        doc.text(descLines, margin + 30, yPosition);
        yPosition += descLines.length * 7 + 8;

        // Compétences
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...primaryColor);
        doc.text('Compétences à acquérir :', margin + 30, yPosition);
        yPosition += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...textColor);
        const competencesText = etape.competences.join(', ');
        const compLines = doc.splitTextToSize(competencesText, maxWidth - 35);
        doc.text(compLines, margin + 35, yPosition);
        yPosition += compLines.length * 5 + 10;

        // Ressources
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...primaryColor);
        doc.text('Ressources recommandées :', margin + 30, yPosition);
        yPosition += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...textColor);
        etape.ressources.forEach((ressource) => {
          doc.text(`• ${ressource.nom}`, margin + 35, yPosition);
          yPosition += 5;
          doc.setTextColor(100, 100, 100);
          const urlLines = doc.splitTextToSize(ressource.url, maxWidth - 45);
          doc.text(urlLines, margin + 40, yPosition);
          yPosition += urlLines.length * 4 + 6;
          doc.setTextColor(...textColor);
        });

        yPosition += 15;
      });
    }

    // Footer final
    doc.addPage();

    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Prochaines étapes', margin, 20);

    yPosition = 50;

    const prochainesEtapes = [
      '1. Explore les ressources recommandées pour commencer à acquérir les compétences fondamentales.',
      '2. Rejoins les communautés professionnelles mentionnées pour échanger avec d autres personnes.',
      '3. Crée un plan d\'action personnalisé avec des objectifs clairs et des échéances.',
      '4. Construis un portfolio de projets pour démontrer tes compétences.',
      '5. Postule à des stages ou des emplois junior pour gagner en expérience.'
    ];

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textColor);

    prochainesEtapes.forEach((etape) => {
      const lines = doc.splitTextToSize(etape, maxWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 7 + 8;
    });

    // Footer final
    const finalY = doc.internal.pageSize.getHeight() - 30;
    doc.setFillColor(...lightGray);
    doc.rect(0, finalY, pageWidth, 30, 'F');

    doc.setTextColor(...textColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('Ce document a été généré par Karia - Plateforme d\'orientation professionnelle', pageWidth / 2, finalY + 15, { align: 'center' });
    doc.text(`Date de génération : ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, finalY + 23, { align: 'center' });

    // Sauvegarder le PDF
    const fileName = `Karia_Parcours_${metier.titre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const selectedParcours = resultats?.parcours?.find((p) => p.id === selectedMetierId);

  if (isLoading || !resultats) {
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
                    Voici le parcours recommandé pour devenir {resultats.metiers.find(m => m.id === selectedMetierId)?.titre}
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
                                  <a href={ressource.url} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center">
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
                  <button
                    onClick={handleDownloadPDF}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
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
            {activeTab === "ressources" && resultats.ressources && (
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
                                  target="_blank"
                                  rel="noopener noreferrer"
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
          {resultats.metiers.length > 0 && (
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
          )}

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
