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
  }
});
// Fonction pour analyser les choix de carrière

export const analyzeCareerChoices = async (formData) => {
  // Prompt soigneusement construit pour votre cas spécifique
  const prompt = `
   Tu es KariaBot, un expert en orientation pour les jeunes Africains. 
Analyse le profil ci-dessous et recommande jusqu'à 3 métiers adaptés, avec pour chacun :
- Pourcentage de correspondance (match) basé sur le profil
- Description du métier
- Compétences requises
- Salaire moyen mensuel en FCFA
- Perspectives d'emploi en Afrique
- Secteurs d'activité principaux

Pour chaque métier, propose un parcours détaillé :
- Étapes de formation concrètes (titre, durée, description, compétences à acquérir, ressources recommandées avec nom et URL)
- Conseille des ressources d'apprentissage et des communautés africaines pertinentes

Profil à analyser :
- Prénom : ${formData.prenom}
- Âge : ${formData.age}
- Sexe : ${formData.sexe}
- Pays : ${formData.pays}
- Ville : ${formData.ville}
- Niveau d'études : ${formData.niveau}
- Série/filière : ${formData.serie}
- Moyennes par matière (sur 20) : Mathématiques : ${formData.matieres.mathematiques}, Français : ${formData.matieres.francais}, Anglais : ${formData.matieres.anglais}, Sciences : ${formData.matieres.sciences}, Histoire-Géo : ${formData.matieres.histoireGeo}, Arts : ${formData.matieres.arts}
- Centres d'intérêt : ${formData.interets.join(', ')}. Description libre : ${formData.interetsLibre}
- Compétences (logiciels/outils) : ${formData.competences.logiciels.join(', ')}
- Langues parlées : ${formData.competences.langues.join(', ')}
- Autres compétences : ${formData.competences.autres}
- Type de métier souhaité : ${formData.typeMetier}
- Style de vie préféré : ${formData.styleVie}
- Préférences de travail : ${formData.preferencesTravail.join(', ')}
- Aspirations professionnelles : ${formData.aspirationsLibre}

Réponds STRICTEMENT au format JSON suivant :
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
      throw new Error("Format de réponse inattendu de l'IA");
    }

    return result;
  } catch (error) {
    console.error("Erreur avec l'API d'orientation:", error);
    if (error.response) {
      console.error("Détail de l'erreur:", error.response.data);
    }
    throw new Error("Désolé, je n'ai pas pu analyser tes réponses. Réessaie plus tard!");
  }
};