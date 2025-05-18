import axios from 'axios';

// Configuration de base pour appeler l'API OpenAI
const apiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    // NOTE: En production, cette clé doit être gérée côté serveur!
    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
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
    // Appel à l'API OpenAI
    const response = await apiClient.post('/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7 // Contrôle la créativité (0=précis, 1=créatif)
    });

    // Extraction et validation de la réponse
    const responseText = response.data.choices[0].message.content;
    const result = JSON.parse(responseText);

    // Validation minimale de la structure
    if (!result.metiers || !Array.isArray(result.metiers)) {
      throw new Error("Format de réponse inattendu de l'IA");
    }

    return result.metiers;
  } catch (error) {
    console.error("Erreur avec l'API d'orientation:", error);
    throw new Error("Désolé, je n'ai pas pu analyser tes réponses. Réessaie plus tard!");
  }
};