// Script de test pour l'API Z.ai
const API_KEY = "4730eaef73fa435ebc02d734ccdda62d.pp3fXKJ4re9Knd9u";
const API_URL = "https://api.z.ai/api/anthropic";

// Données de test réalistes
const formData = {
  prenom: "Christophe",
  age: 28,
  sexe: "homme",
  pays: "senegal",
  ville: "Dakar",
  niveau: "licence",
  serie: "informatique",
  matieres: {
    mathematiques: 16,
    francais: 14,
    anglais: 15,
    sciences: 17,
    histoireGeo: 12,
    arts: 10
  },
  interets: ["technologie", "programmation", "innovation"],
  interetsLibre: "J'aime créer des applications web et aider les autres",
  competences: {
    logiciels: ["VS Code", "Git", "React", "Node.js"],
    langues: ["français", "anglais", "wolof"],
    autres: "Résolution de problèmes, travail d'équipe, communication"
  },
  typeMetier: "technique",
  styleVie: "flexible",
  preferencesTravail: ["teletravail", "equipe", "innovant"],
  aspirationsLibre: "Je veux créer des solutions technologiques qui impactent positivement la société africaine"
};

// Prompt formaté pour l'API
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

console.log("=".repeat(80));
console.log("TEST DE L'API Z.AI (CLAUDE)");
console.log("=".repeat(80));
console.log("\n📤 DONNÉES ENVOYÉES À L'API:");
console.log("-".repeat(80));
console.log("URL:", API_URL + "/v1/messages");
console.log("Modèle: claude-3-5-sonnet-20241022");
console.log("Max tokens: 4096");
console.log("\n👤 PROFIL UTILISATEUR:");
console.log(JSON.stringify(formData, null, 2));
console.log("\n📝 PROMPT (extrait):");
console.log(prompt.substring(0, 500) + "...");
console.log("\n" + "=".repeat(80));

// Faire la requête avec fetch
fetch(API_URL + "/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    "anthropic-version": "2023-06-01"
  },
  body: JSON.stringify({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4096,
    system: "Tu es KariaBot, un expert en orientation pour les jeunes Africains. Tu réponds toujours au format JSON valide, sans aucune explication en dehors du JSON.",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  })
})
.then(response => {
  console.log("\n📥 RÉPONSE HTTP:");
  console.log("-".repeat(80));
  console.log("Status:", response.status);
  console.log("Status Text:", response.statusText);
  console.log("Headers:", JSON.stringify([...response.headers.entries()], null, 2));
  return response.json();
})
.then(data => {
  console.log("\n✅ RÉPONSE API REÇUE:");
  console.log("-".repeat(80));

  if (data.error) {
    console.log("❌ ERREUR:", JSON.stringify(data.error, null, 2));
    return;
  }

  console.log("ID de la requête:", data.id);
  console.log("Type:", data.type);
  console.log("Modèle utilisé:", data.model);
  console.log("Tokens d'entrée:", data.usage?.input_tokens);
  console.log("Tokens de sortie:", data.usage?.output_tokens);

  console.log("\n📄 CONTENU DE LA RÉPONSE:");
  console.log("-".repeat(80));

  const responseText = data.content[0].text;
  console.log("Texte brut (500 premiers caractères):");
  console.log(responseText.substring(0, 500) + "...\n");

  try {
    const parsed = JSON.parse(responseText);
    console.log("✅ JSON VALIDÉ AVEC SUCCÈS!");
    console.log("\n📊 ANALYSE DE LA RÉPONSE:");
    console.log("-".repeat(80));
    console.log("Nombre de métiers recommandés:", parsed.metiers?.length || 0);
    console.log("Nombre de parcours:", parsed.parcours?.length || 0);
    console.log("Nombre de catégories de ressources:", parsed.ressources?.length || 0);

    if (parsed.metiers && parsed.metiers.length > 0) {
      console.log("\n🎯 MÉTIERS RECOMMANDÉS:");
      parsed.metiers.forEach((metier, index) => {
        console.log(`\n${index + 1}. ${metier.titre} (${metier.match}% de correspondance)`);
        console.log("   Description:", metier.description.substring(0, 100) + "...");
        console.log("   Salaire:", metier.salaire);
        console.log("   Secteurs:", metier.secteurs.join(", "));
      });
    }

    if (parsed.parcours && parsed.parcours.length > 0) {
      console.log("\n📚 PARCOURS RECOMMANDÉS:");
      parsed.parcours.forEach((parcours, index) => {
        console.log(`\n${index + 1}. ${parcours.titre}`);
        console.log("   Nombre d'étapes:", parcours.etapes?.length || 0);
      });
    }

    console.log("\n" + "=".repeat(80));
    console.log("✅ TEST TERMINÉ AVEC SUCCÈS!");
    console.log("=".repeat(80));

    // Sauvegarder la réponse dans un fichier
    const fs = require('fs');
    fs.writeFileSync('test-response.json', JSON.stringify(parsed, null, 2));
    console.log("\n💾 Réponse complète sauvegardée dans: test-response.json");

  } catch (parseError) {
    console.log("❌ ERREUR DE PARSING JSON:");
    console.log(parseError.message);
    console.log("\nRéponse brute:");
    console.log(responseText);
  }
})
.catch(error => {
  console.log("\n❌ ERREUR DE REQUÊTE:");
  console.log("-".repeat(80));
  console.log("Message:", error.message);
  console.log("Stack:", error.stack);
});
