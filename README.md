# 🚌 BusDirect 2 – Application de gestion des réservations de bus

## 📌 Présentation du projet

**BusDirect 2** est une application web permettant de gérer les réservations de bus interurbains sur un réseau de plusieurs trajets au départ de différentes villes.

L'objectif est de faciliter le travail des agents en leur permettant de consulter les trajets, de gérer les réservations des passagers et de suivre les disponibilités des places en temps réel.

## 🎯 Fonctionnalités principales

- **Gestion des trajets :** affichage des 20 trajets disponibles à partir d'un fichier JSON.
- **Recherche :** rechercher un trajet selon les villes de départ et de destination.
- **Filtrage :** filtrer les trajets selon leur statut (disponible ou complet).
- **Gestion des réservations :** ajouter, modifier et supprimer des réservations.
- **Gestion des places :** visualiser les places libres et occupées sur le plan du bus.
- **Liste d'attente :** ajouter des passagers à une liste d'attente lorsque le bus est complet.
- **Suivi des recettes :** calculer les revenus générés par les réservations.
- **Stockage des données :** utiliser LocalStorage pour conserver les données après le rechargement de la page.

## 🛠️ Technologies utilisées

- **HTML5** : structure des pages.
- **Tailwind CSS** : mise en forme et design responsive.
- **JavaScript (ES6+)** : logique et interactions dynamiques.
- **DOM Manipulation** : mise à jour dynamique de l'interface.
- **Fetch API** : récupération des données depuis un fichier JSON.
- **Async/Await** : gestion des opérations asynchrones.
- **LocalStorage** : sauvegarde locale des données.
- **ES Modules** : organisation du code avec `import` et `export`.
- **JSON** : stockage initial des informations sur les trajets.

## 📂 Structure du projet

```text
BusDirect2/
│
├── data/
│   └── trips.json
│
├── js/
│   ├── store.js
│   └── ...
│
├── index.html
├── cabine.html
└── README.md
```

## ⚙️ Installation et lancement

1. Cloner le dépôt :

```bash
git clone URL_DU_REPOSITORY
```

2. Accéder au dossier du projet :

```bash
cd BusDirect2
```

3. Ouvrir le projet avec Visual Studio Code.

4. Lancer le projet avec l'extension **Live Server** ou un serveur de développement local pour permettre l'utilisation de Fetch API.

## 📚 Objectifs pédagogiques

Ce projet permet de mettre en pratique plusieurs notions importantes du développement web :

- Manipulation du DOM.
- Gestion des événements JavaScript.
- Manipulation des tableaux et des objets.
- Récupération de données avec Fetch API.
- Programmation asynchrone avec Async/Await.
- Gestion des données avec LocalStorage.
- Organisation du code avec les modules ES6.
- Utilisation de Git et GitHub pour la gestion des versions et des branches.

## 👨‍💻 Auteur

Projet réalisé dans le cadre d'un exercice pratique de développement web.

**BusDirect 2 – Simplifier la gestion des réservations de bus.**
