import axios from 'axios';

// Configuration de base pour appeler l'API Z.ai (Claude)
const API_KEY = import.meta.env.VITE_ZAI_API_KEY;
const API_URL = import.meta.env.VITE_ZAI_API_URL || 'https://api.z.ai/api/anthropic';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    'anthropic-version': '2023-06-01'
  },
  timeout: 60000 // 60 secondes
});

// Fonction pour analyser les choix de carrière

export const analyzeCareerChoices = async (formData) => {
  // Prompt soigneusement construit pour votre cas spécifique
  const prompt = `
   Tu es KariaBot, un expert en orientation pour les jeunes Africains.
Analyse le profil ci-dessous et recommande jusqu'à 3 métiers adaptés, avec pour chacun :
- Pourcentage de correspondance (match) basé sur le profil
- Description du métier
- Compétences requises
- Salaire moyen mensuel en FCFA
- Perspectives d'emploi en Afrique
- Secteurs d'activité principaux

Pour chaque métier, propose un parcours détaillé :
- Étapes de formation concrètes (titre, durée, description, compétences à acquérir, ressources recommandées avec nom et URL)
- Conseille des ressources d'apprentissage et des communautés africaines pertinentes

Profil à analyser :
- Prénom : ${formData.prenom}
- Âge : ${formData.age}
- Sexe : ${formData.sexe}
- Pays : ${formData.pays}
- Ville : ${formData.ville}
- Niveau d'études : ${formData.niveau}
- Série/filière : ${formData.serie}
- Moyennes par matière (sur 20) : Mathématiques : ${formData.matieres.mathematiques}, Français : ${formData.matieres.francais}, Anglais : ${formData.matieres.anglais}, Sciences : ${formData.matieres.sciences}, Histoire-Géo : ${formData.matieres.histoireGeo}, Arts : ${formData.matieres.arts}
- Centres d'intérêt : ${formData.interets.join(', ')}. Description libre : ${formData.interetsLibre}
- Compétences (logiciels/outils) : ${formData.competences.logiciels.join(', ')}
- Langues parlées : ${formData.competences.langues.join(', ')}
- Autres compétences : ${formData.competences.autres}
- Type de métier souhaité : ${formData.typeMetier}
- Style de vie préféré : ${formData.styleVie}
- Préférences de travail : ${formData.preferencesTravail.join(', ')}
- Aspirations professionnelles : ${formData.aspirationsLibre}

Réponds STRICTEMENT au format JSON suivant :
{
  "metiers": [
    {
      "id": "string (unique, ex: dev_web)",
      "titre": "string",
      "description": "string",
      "match": number (1-100),
      "competences": ["string", ...],
      "salaire": "string",
      "perspectives": "string",
      "secteurs": ["string", ...]
    }
  ],
  "parcours": [
    {
      "id": "correspond à l'id du métier",
      "titre": "string",
      "etapes": [
        {
          "titre": "string",
          "duree": "string",
          "description": "string",
          "ressources": [
            { "nom": "string", "url": "string" }
          ],
          "competences": ["string", ...]
        }
      ]
    }
  ],
  "ressources": [
    {
      "categorie": "string",
      "items": [
        { "nom": "string", "description": "string", "url": "string" }
      ]
    }
  ]
}
Aucune explication, uniquement le JSON.
  `;

  try {
    // Appel à l'API Z.ai (Claude)
    const response = await apiClient.post('/v1/messages', {
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: "Tu es KariaBot, un expert en orientation pour les jeunes Africains. Tu réponds toujours au format JSON valide, sans aucune explication en dehors du JSON.",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    // Extraction et validation de la réponse
    let responseText = response.data.content[0].text;

    // Nettoyer les marqueurs de code markdown si présents
    responseText = responseText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

    const result = JSON.parse(responseText);

    // Validation minimale de la structure
    if (!result.metiers || !Array.isArray(result.metiers)) {
      throw new Error("FORMAT_INVALID");
    }

    return result;
  } catch (error) {
    console.error("Erreur avec l'API d'orientation:", error);

    // Gestion spécifique des erreurs
    if (error.response) {
      // Erreur HTTP (401, 403, 429, 500, etc.)
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 401:
        case 403:
          console.error("Erreur d'authentification:", data);
          throw new Error("API_KEY_INVALID");

        case 429:
          console.error("Quota dépassé:", data);
          throw new Error("QUOTA_EXCEEDED");

        case 500:
        case 502:
        case 503:
          console.error("Erreur serveur:", data);
          throw new Error("SERVICE_UNAVAILABLE");

        default:
          console.error("Erreur inattendue:", status, data);
          throw new Error("API_ERROR");
      }
    }

    if (error.code === 'ECONNABORTED') {
      // Timeout
      throw new Error("TIMEOUT");
    }

    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      // Erreur réseau
      throw new Error("NETWORK_ERROR");
    }

    if (error instanceof SyntaxError) {
      // Erreur de parsing JSON
      throw new Error("PARSE_ERROR");
    }

    // Erreur générique
    throw new Error("UNKNOWN_ERROR");
  }
};

// Fonction utilitaire pour obtenir un message d'erreur convivial
export const getErrorMessage = (error) => {
  const errorMessages = {
    'API_KEY_INVALID': {
      title: "Service temporairement indisponible",
      message: "Nos systèmes sont actuellement en maintenance. Veuillez réessayer dans quelques instants.",
      action: "Nos équipes ont été informées et travaillent sur une solution"
    },
    'QUOTA_EXCEEDED': {
      title: "Service temporairement indisponible",
      message: "Le service est actuellement très sollicité. Veuillez réessayer dans quelques minutes.",
      action: "Nos équipes ont été informées"
    },
    'SERVICE_UNAVAILABLE': {
      title: "Service temporairement indisponible",
      message: "Une maintenance est en cours. Veuillez réessayer ultérieurement.",
      action: "Nos équipes travaillent pour rétablir le service"
    },
    'TIMEOUT': {
      title: "Service temporairement indisponible",
      message: "Le traitement de votre demande prend plus de temps que prévu. Veuillez réessayer.",
      action: "Réessayer dans quelques instants"
    },
    'NETWORK_ERROR': {
      title: "Service temporairement indisponible",
      message: "Une difficulté technique nous empêche de traiter votre demande. Veuillez réessayer.",
      action: "Réessayer dans quelques instants"
    },
    'PARSE_ERROR': {
      title: "Service temporairement indisponible",
      message: "Une difficulté technique est survenue. Veuillez réessayer ultérieurement.",
      action: "Nos équipes ont été informées"
    },
    'FORMAT_INVALID': {
      title: "Service temporairement indisponible",
      message: "Nous n'avons pas pu traiter votre demande. Veuillez réessayer.",
      action: "Réessayer dans quelques instants"
    },
    'API_ERROR': {
      title: "Service temporairement indisponible",
      message: "Une difficulté technique est survenue. Veuillez réessayer ultérieurement.",
      action: "Nos équipes ont été informées"
    },
    'UNKNOWN_ERROR': {
      title: "Service temporairement indisponible",
      message: "Une difficulté technique est survenue. Nos équipes en ont été informées.",
      action: "Veuillez réessayer ultérieurement"
    }
  };

  return errorMessages[error.message] || errorMessages['UNKNOWN_ERROR'];
};