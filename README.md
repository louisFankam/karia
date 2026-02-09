# Karia
<img width="1904" height="855" alt="image" src="https://github.com/user-attachments/assets/6abfe02a-374b-4ae8-9e17-71dadb2b231c" />
<img width="1911" height="822" alt="image" src="https://github.com/user-attachments/assets/6a6426b8-b529-4295-b246-70b9c5d8f28d" />



Plateforme d'orientation professionnelle intelligente pour les jeunes Africains, propulsée par l'intelligence artificielle.

## Overview

Karia est une application web moderne qui aide les jeunes Africains à découvrir leur voie professionnelle grâce à une analyse approfondie de leur profil académique, de leurs centres d'intérêt et de leurs aspirations. En utilisant l'IA pour générer des recommandations personnalisées, Karia propose des métiers adaptés et des parcours de formation concrets, spécialement conçus pour le contexte africain.

## Fonctionnalités

- **Formulaire multi-étapes complet** : Analyse détaillée du profil (informations personnelles, parcours scolaire, centres d'intérêt, compétences, aspirations)
- **Recommandations IA personnalisées** : Jusqu'à 3 métiers recommandés avec pourcentage de correspondance
- **Parcours de formation détaillés** : Étapes concrètes avec durées, compétences à acquérir et ressources recommandées
- **Ressources adaptées à l'Afrique** : Formations, communautés et opportunités spécifiques au continent africain
- **Interface responsive** : Expérience utilisateur optimale sur desktop et mobile
- **Animations fluides** : Transitions et interactions soignées avec Framer Motion

## Technologies

### Frontend
- **React 19.1.0** - Bibliothèque UI
- **React Router DOM 7.6.0** - Routage SPA
- **Vite 6.3.5** - Build tool et serveur de développement
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **Framer Motion 12.12.1** - Animations
- **React Feather 2.0.10** - Icônes

### API
- **API Z.ai (Claude)** - Génération de recommandations personnalisées
- **Axios** - Client HTTP

## Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn
- Une clé API Z.ai (disponible sur https://z.ai)

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/your-username/karia.git
cd karia
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
cp .env.example .env.local
```

Éditez le fichier `.env.local` et ajoutez votre clé API Z.ai :

```env
VITE_ZAI_API_KEY=your_zai_api_key_here
VITE_ZAI_API_URL=https://api.z.ai/api/anthropic
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Structure du projet

```
karia/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   └── ProgressBar.jsx
│   ├── pages/             # Pages de l'application
│   │   ├── Home.jsx
│   │   ├── Form.jsx
│   │   ├── Result.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── service/           # Services API
│   │   └── api/
│   │       └── OrientationAi.js
│   ├── assets/            # Images et ressources
│   ├── App.jsx            # Configuration des routes
│   ├── main.jsx           # Point d'entrée
│   └── index.css          # Styles globaux
├── .env.example           # Exemple de configuration
├── .env.local             # Configuration locale (non commité)
├── .gitignore
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Scripts disponibles

```bash
npm run dev        # Lance le serveur de développement
npm run build      # Crée un build de production
npm run preview    # Prévisualise le build de production
npm run lint       # Exécute ESLint
```

## Build de production

### 1. Créer le build

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`

### 2. Prévisualiser le build

```bash
npm run preview
```

## Déploiement

Karia peut être déployé sur n'importe quel service d'hébergement statique :

- **Vercel** : `npm install -g vercel` puis `vercel`
- **Netlify** : Connectez votre repository GitHub
- **GitHub Pages** : Configurez GitHub Pages pour déployer depuis la branche `gh-pages`

Assurez-vous de configurer les variables d'environnement sur votre plateforme de déploiement.

## Configuration API

L'application utilise l'API Z.ai pour générer des recommandations. Pour obtenir une clé API :

1. Visitez https://z.ai
2. Créez un compte
3. Générez une clé API
4. Ajoutez-la dans votre fichier `.env.local`

### Considérations de sécurité

Important : La clé API ne doit jamais être commitée dans le repository. Le fichier `.env.local` est inclus dans `.gitignore` pour éviter cela.

Pour un environnement de production, il est recommandé de :
- Créer un backend proxy pour masquer la clé API
- Utiliser des variables d'environnement côté serveur
- Implémenter un rate limiting pour éviter les abus

## Contributeurs

Ce projet a été développé pour aider les jeunes Africains à trouver leur voie professionnelle.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Support

Pour toute question ou suggestion :
- Ouvrez une issue sur GitHub
- Contactez l'équipe de développement

---

**Note** : Karia est un projet en développement continu. Les contributions sont les bienvenues.
