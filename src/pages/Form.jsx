import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Heart, Briefcase, Activity, ArrowLeft, ArrowRight, Check, AlertCircle, X } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IntroModal from '../components/IntroModal';
import { analyzeCareerChoices, getErrorMessage } from '../service/api/OrientationAi';

const Formulaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: "",
    prenom: "",
    age: "",
    sexe: "",
    pays: "",
    ville: "",

    // Parcours scolaire
    niveau: "",
    serie: "",
    matieres: {
      mathematiques: "",
      francais: "",
      anglais: "",
      sciences: "",
      histoireGeo: "",
      arts: "",
    },

    // Centres d'intérêt
    interets: [],
    interetsLibre: "",

    // Compétences
    competences: {
      logiciels: [],
      langues: [],
      autres: "",
    },

    // Aspirations
    typeMetier: "",
    styleVie: "",
    preferencesTravail: [],
    aspirationsLibre: "",
  });

  const steps = [
    { id: "personal", title: "Informations personnelles", icon: <User className="w-5 h-5" /> },
    { id: "education", title: "Parcours scolaire", icon: <BookOpen className="w-5 h-5" /> },
    { id: "interests", title: "Centres d'intérêt", icon: <Heart className="w-5 h-5" /> },
    { id: "skills", title: "Compétences", icon: <Activity className="w-5 h-5" /> },
    { id: "aspirations", title: "Aspirations", icon: <Briefcase className="w-5 h-5" /> },
  ];

  const ProgressBar = ({ progress }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-orange-600 h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  const FormStepIndicator = ({ steps, currentStep, onStepClick }) => {
    return (

      <div className="flex justify-between">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick(index)}
            className={`flex flex-col items-center ${index <= currentStep ? 'text-orange-600' : 'text-gray-400'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${index <= currentStep ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`} >
              {step.icon}
            </div>
            <span className="text-xs font-medium">{step.title}</span>
          </button>
        ))}
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  // Fonctions de validation pour chaque étape
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Informations personnelles
        if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
        if (!formData.age || formData.age < 10 || formData.age > 100) {
          newErrors.age = "Veuillez entrer un âge valide (entre 10 et 100 ans)";
        }
        if (!formData.sexe) newErrors.sexe = "Le sexe est requis";
        if (!formData.pays.trim()) newErrors.pays = "Le pays est requis";
        if (!formData.ville.trim()) newErrors.ville = "La ville est requise";
        break;

      case 1: // Parcours scolaire
        if (!formData.niveau) newErrors.niveau = "Le niveau d'études est requis";
        if (!formData.serie) newErrors.serie = "La série/filière est requise";
        // Validation des notes (0-20)
        Object.keys(formData.matieres).forEach(matiere => {
          const note = formData.matieres[matiere];
          if (note && (note < 0 || note > 20)) {
            newErrors[`matieres.${matiere}`] = "La note doit être entre 0 et 20";
          }
        });
        break;

      case 2: // Centres d'intérêt
        if (formData.interets.length === 0 && !formData.interetsLibre.trim()) {
          newErrors.interets = "Veuillez sélectionner au moins un centre d'intérêt ou en décrire un";
        }
        break;

      case 3: // Compétences
        // Cette étape est optionnelle, pas de validation stricte
        break;

      case 4: // Aspirations
        if (!formData.typeMetier) newErrors.typeMetier = "Le type de métier est requis";
        if (!formData.styleVie) newErrors.styleVie = "Le style de vie est requis";
        if (formData.preferencesTravail.length === 0) {
          newErrors.preferencesTravail = "Veuillez sélectionner au moins une préférence de travail";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    // Valider l'étape actuelle avant d'avancer
    if (!validateStep(currentStep)) {
      // Si la validation échoue, scroller vers le premier champ en erreur
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setErrors({}); // Réinitialiser les erreurs
      window.scrollTo(0, 0);
    } else {
      // Soumettre le formulaire et appeler l'API
      setIsLoading(true);
      try {
        const result = await analyzeCareerChoices(formData);
        // Stocker les résultats dans localStorage pour la page Result
        localStorage.setItem('kariaResults', JSON.stringify(result));
        // Rediriger vers la page de résultats
        navigate('/resultats');
      } catch (error) {
        console.error("Erreur lors de la soumission:", error);
        // Récupérer le message d'erreur convivial
        const errorInfo = getErrorMessage(error);
        setApiError(errorInfo);
        setIsLoading(false);
      }
    }
  };

  const closeErrorModal = () => {
    setApiError(null);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {showIntroModal && <IntroModal onStart={() => setShowIntroModal(false)} />}

      {/* Modal d'erreur API */}
      {apiError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Header */}
            <div className="bg-red-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3" />
                  <h2 className="text-xl font-bold">{apiError.title}</h2>
                </div>
                <button
                  onClick={closeErrorModal}
                  className="text-white hover:text-red-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-6">
                {apiError.message}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Action recommandée :</span> {apiError.action}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex gap-3">
              <button
                onClick={closeErrorModal}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  closeErrorModal();
                  handleNext();
                }}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      )}

      {!showIntroModal && (
        <>
          <Header />
          <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Découvre ton parcours idéal</h1>
            <p className="text-gray-600 text-center mb-6">
              Réponds à ces questions pour que nous puissions te recommander les meilleurs parcours professionnels.
            </p>

            <div className="mb-8">
              <ProgressBar progress={progressPercentage} />
              <div className="mt-4">
                <FormStepIndicator 
                  steps={steps} 
                  currentStep={currentStep} 
                  onStepClick={(index) => setCurrentStep(index)} 
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 relative overflow-hidden">
            <AnimatePresence initial={false} custom={currentStep}>
              <motion.div
                key={currentStep}
                custom={currentStep}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                {/* Étape 1: Informations personnelles */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-500" />
                      Informations personnelles
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom *</label>
                        <input
                          id="prenom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleInputChange}
                          placeholder="Ton prénom"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${errors.prenom ? 'border-red-500' : 'border-gray-300'}`}
                          data-error={!!errors.prenom}
                        />
                        {errors.prenom && <p className="text-sm text-red-600">{errors.prenom}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                          id="nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleInputChange}
                          placeholder="Ton nom"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Âge *</label>
                        <input
                          id="age"
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="Ton âge"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                          data-error={!!errors.age}
                        />
                        {errors.age && <p className="text-sm text-red-600">{errors.age}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Sexe *</label>
                        <div className="flex gap-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="sexe"
                              value="homme"
                              checked={formData.sexe === "homme"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                            />
                            <span className="ml-2">Homme</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="sexe"
                              value="femme"
                              checked={formData.sexe === "femme"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                            />
                            <span className="ml-2">Femme</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="sexe"
                              value="autre"
                              checked={formData.sexe === "autre"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                            />
                            <span className="ml-2">Autre</span>
                          </label>
                        </div>
                        {errors.sexe && <p className="text-sm text-red-600">{errors.sexe}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="pays" className="block text-sm font-medium text-gray-700">Pays *</label>
                        <select
                          id="pays"
                          name="pays"
                          value={formData.pays}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${errors.pays ? 'border-red-500' : 'border-gray-300'}`}
                          data-error={!!errors.pays}
                        >
                          <option value="">Sélectionne ton pays</option>
                          <option value="senegal">Sénégal</option>
                          <option value="cote_ivoire">Côte d'Ivoire</option>
                          <option value="cameroun">Cameroun</option>
                          <option value="ghana">Ghana</option>
                          <option value="nigeria">Nigeria</option>
                          <option value="kenya">Kenya</option>
                          <option value="maroc">Maroc</option>
                          <option value="autre">Autre</option>
                        </select>
                        {errors.pays && <p className="text-sm text-red-600">{errors.pays}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville *</label>
                        <input
                          id="ville"
                          name="ville"
                          value={formData.ville}
                          onChange={handleInputChange}
                          placeholder="Ta ville"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${errors.ville ? 'border-red-500' : 'border-gray-300'}`}
                          data-error={!!errors.ville}
                        />
                        {errors.ville && <p className="text-sm text-red-600">{errors.ville}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Étape 2: Parcours scolaire */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-orange-500" />
                      Parcours scolaire
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="niveau" className="block text-sm font-medium text-gray-700">Niveau d'études actuel</label>
                        <select
                          id="niveau"
                          name="niveau"
                          value={formData.niveau}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="">Sélectionne ton niveau</option>
                          <option value="college">Collège</option>
                          <option value="lycee">Lycée</option>
                          <option value="bac">Baccalauréat</option>
                          <option value="licence">Licence / Bachelor</option>
                          <option value="master">Master</option>
                          <option value="doctorat">Doctorat</option>
                          <option value="formation_pro">Formation professionnelle</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="serie" className="block text-sm font-medium text-gray-700">Série ou filière</label>
                        <input
                          id="serie"
                          name="serie"
                          value={formData.serie}
                          onChange={handleInputChange}
                          placeholder="Ex: Scientifique, Littéraire, Technique..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Tes moyennes par matière (sur 20)</label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="mathematiques" className="block text-sm font-medium text-gray-700">Mathématiques</label>
                          <input
                            id="mathematiques"
                            type="number"
                            min="0"
                            max="20"
                            value={formData.matieres.mathematiques}
                            onChange={(e) => handleNestedInputChange("matieres", "mathematiques", e.target.value)}
                            placeholder="/20"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="francais" className="block text-sm font-medium text-gray-700">Français</label>
                          <input
                            id="francais"
                            type="number"
                            min="0"
                            max="20"
                            value={formData.matieres.francais}
                            onChange={(e) => handleNestedInputChange("matieres", "francais", e.target.value)}
                            placeholder="/20"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="anglais" className="block text-sm font-medium text-gray-700">Anglais</label>
                          <input
                            id="anglais"
                            type="number"
                            min="0"
                            max="20"
                            value={formData.matieres.anglais}
                            onChange={(e) => handleNestedInputChange("matieres", "anglais", e.target.value)}
                            placeholder="/20"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="sciences" className="block text-sm font-medium text-gray-700">Sciences</label>
                          <input
                            id="sciences"
                            type="number"
                            min="0"
                            max="20"
                            value={formData.matieres.sciences}
                            onChange={(e) => handleNestedInputChange("matieres", "sciences", e.target.value)}
                            placeholder="/20"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="histoireGeo" className="block text-sm font-medium text-gray-700">Histoire-Géographie</label>
                          <input
                            id="histoireGeo"
                            type="number"
                            min="0"
                            max="20"
                            value={formData.matieres.histoireGeo}
                            onChange={(e) => handleNestedInputChange("matieres", "histoireGeo", e.target.value)}
                            placeholder="/20"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="arts" className="block text-sm font-medium text-gray-700">Arts</label>
                          <input
                            id="arts"
                            type="number"
                            min="0"
                            max="20"
                            value={formData.matieres.arts}
                            onChange={(e) => handleNestedInputChange("matieres", "arts", e.target.value)}
                            placeholder="/20"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Étape 3: Centres d'intérêt */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-orange-500" />
                      Centres d'intérêt
                    </h2>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Sélectionne tes centres d'intérêt (plusieurs choix possibles)</label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: "tech", label: "Technologie et informatique" },
                          { id: "art", label: "Art et créativité" },
                          { id: "science", label: "Sciences et recherche" },
                          { id: "business", label: "Business et entrepreneuriat" },
                          { id: "social", label: "Social et humanitaire" },
                          { id: "sante", label: "Santé et bien-être" },
                          { id: "education", label: "Éducation et formation" },
                          { id: "environnement", label: "Environnement et développement durable" },
                          { id: "media", label: "Médias et communication" },
                          { id: "sport", label: "Sport et activités physiques" },
                          { id: "culture", label: "Culture et patrimoine" },
                          { id: "agriculture", label: "Agriculture et alimentation" },
                        ].map((interet) => (
                          <div key={interet.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={interet.id}
                              checked={formData.interets.includes(interet.id)}
                              onChange={() => handleCheckboxChange("interets", interet.id)}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor={interet.id} className="ml-2 block text-sm text-gray-700">
                              {interet.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="interetsLibre" className="block text-sm font-medium text-gray-700">Décris tes centres d'intérêt avec tes propres mots</label>
                      <textarea
                        id="interetsLibre"
                        name="interetsLibre"
                        value={formData.interetsLibre}
                        onChange={handleInputChange}
                        placeholder="Parle-nous de ce qui te passionne, de tes hobbies, de ce que tu aimes faire pendant ton temps libre..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}

                {/* Étape 4: Compétences */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-orange-500" />
                      Compétences
                    </h2>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Logiciels et outils que tu maîtrises</label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: "office", label: "Suite Office (Word, Excel, PowerPoint)" },
                          { id: "design", label: "Logiciels de design (Photoshop, Illustrator)" },
                          { id: "programmation", label: "Programmation (HTML, JavaScript, Python...)" },
                          { id: "video", label: "Montage vidéo/audio" },
                          { id: "cms", label: "CMS (WordPress, Shopify...)" },
                          { id: "comptabilite", label: "Logiciels de comptabilité" },
                          { id: "mobile", label: "Applications mobiles spécialisées" },
                          { id: "marketing", label: "Outils de marketing digital" },
                        ].map((logiciel) => (
                          <div key={logiciel.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`logiciel-${logiciel.id}`}
                              checked={formData.competences.logiciels.includes(logiciel.id)}
                              onChange={() => {
                                const newLogiciels = formData.competences.logiciels.includes(logiciel.id)
                                  ? formData.competences.logiciels.filter(id => id !== logiciel.id)
                                  : [...formData.competences.logiciels, logiciel.id];
                                setFormData({
                                  ...formData,
                                  competences: { ...formData.competences, logiciels: newLogiciels }
                                });
                              }}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`logiciel-${logiciel.id}`} className="ml-2 block text-sm text-gray-700">
                              {logiciel.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Langues parlées</label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: "francais", label: "Français" },
                          { id: "anglais", label: "Anglais" },
                          { id: "arabe", label: "Arabe" },
                          { id: "wolof", label: "Wolof" },
                          { id: "swahili", label: "Swahili" },
                          { id: "yoruba", label: "Yoruba" },
                          { id: "hausa", label: "Hausa" },
                          { id: "portugais", label: "Portugais" },
                        ].map((langue) => (
                          <div key={langue.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`langue-${langue.id}`}
                              checked={formData.competences.langues.includes(langue.id)}
                              onChange={() => {
                                const newLangues = formData.competences.langues.includes(langue.id)
                                  ? formData.competences.langues.filter(id => id !== langue.id)
                                  : [...formData.competences.langues, langue.id];
                                setFormData({
                                  ...formData,
                                  competences: { ...formData.competences, langues: newLangues }
                                });
                              }}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`langue-${langue.id}`} className="ml-2 block text-sm text-gray-700">
                              {langue.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="autres-competences" className="block text-sm font-medium text-gray-700">Autres compétences</label>
                      <textarea
                        id="autres-competences"
                        value={formData.competences.autres}
                        onChange={(e) => handleNestedInputChange("competences", "autres", e.target.value)}
                        placeholder="Décris tes autres compétences (soft skills, compétences techniques, etc.)"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}

                {/* Étape 5: Aspirations */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-orange-500" />
                      Aspirations
                    </h2>

                    <div className="space-y-2">
                      <label htmlFor="typeMetier" className="block text-sm font-medium text-gray-700">Quel type de métier t'intéresse le plus ?</label>
                      <select
                        id="typeMetier"
                        name="typeMetier"
                        value={formData.typeMetier}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Sélectionne un type de métier</option>
                        <option value="technique">Métier technique</option>
                        <option value="creatif">Métier créatif</option>
                        <option value="social">Métier social/relationnel</option>
                        <option value="analytique">Métier analytique/recherche</option>
                        <option value="management">Management/Leadership</option>
                        <option value="entrepreneuriat">Entrepreneuriat</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="styleVie" className="block text-sm font-medium text-gray-700">Quel style de vie recherches-tu ?</label>
                      <select
                        id="styleVie"
                        name="styleVie"
                        value={formData.styleVie}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Sélectionne un style de vie</option>
                        <option value="urbain">Vie urbaine, dynamique</option>
                        <option value="rural">Vie rurale, proche de la nature</option>
                        <option value="nomade">Vie nomade, voyages fréquents</option>
                        <option value="equilibre">Équilibre travail-vie personnelle</option>
                        <option value="impact">Impact social et communautaire</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Préférences de travail</label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: "bureau", label: "Travail au bureau" },
                          { id: "terrain", label: "Travail sur le terrain" },
                          { id: "remote", label: "Télétravail" },
                          { id: "equipe", label: "Travail en équipe" },
                          { id: "autonomie", label: "Travail autonome" },
                          { id: "international", label: "Dimension internationale" },
                          { id: "local", label: "Ancrage local" },
                          { id: "innovation", label: "Innovation constante" },
                        ].map((preference) => (
                          <div key={preference.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`pref-${preference.id}`}
                              checked={formData.preferencesTravail.includes(preference.id)}
                              onChange={() => handleCheckboxChange("preferencesTravail", preference.id)}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`pref-${preference.id}`} className="ml-2 block text-sm text-gray-700">
                              {preference.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="aspirationsLibre" className="block text-sm font-medium text-gray-700">Parle-nous de tes aspirations professionnelles</label>
                      <textarea
                        id="aspirationsLibre"
                        name="aspirationsLibre"
                        value={formData.aspirationsLibre}
                        onChange={handleInputChange}
                        placeholder="Quels sont tes objectifs professionnels ? Qu'espères-tu accomplir dans ta carrière ?"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm ${currentStep === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </button>

              <button
                onClick={handleNext}
                disabled={isLoading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${isLoading ? 'bg-orange-400 cursor-not-allowed' : 'text-white bg-orange-600 hover:bg-orange-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyse en cours...
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    Voir mes résultats
                    <Check className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Suivant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
        </>
      )}
    </div>
  );
};

export default Formulaire;