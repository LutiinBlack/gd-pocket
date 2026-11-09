# GD Pocket

Éditeur GDScript de poche pour modifier les scripts d'un projet Godot 4 depuis un téléphone ou une tablette, directement dans un dépôt GitHub.

- **Version actuelle : v0.14.0** (09/11/2026) — validée sur le téléphone Android (v0.13.0 aussi sur l'iPad mini 2, iOS 12)
- **Langues :** français et anglais (English)
- **Appli en ligne :** https://lutiinblack.github.io/gd-pocket/
- **Format :** application web installable (PWA), distribuée hors Google Play et App Store

## Installer

1. Ouvrir l'adresse de l'appli dans Chrome (Android) ou Safari (iPhone / iPad).
2. Android : menu ⋮ › « Ajouter à l'écran d'accueil ». iOS : bouton Partager › « Sur l'écran d'accueil ».
3. Dans l'appli : 📁 › Réglages › Dépôts GitHub › ＋ Ajouter un dépôt (propriétaire, nom, branche, jeton existant ou nouveau).

Le jeton est un jeton GitHub *fine-grained* limité au(x) dépôt(s) voulu(s), avec la permission **Contents : Read and write**. Un même jeton peut servir à plusieurs dépôts (Réglages › 🔑 Jetons) ; le remplacer à son expiration met à jour tous ses dépôts. Il reste uniquement sur l'appareil et n'est envoyé qu'à `api.github.com`. Sur iOS, l'appli installée a son propre stockage : y recoller le jeton.

🔒 **Sécurité du jeton :** voir [SECURITE.md](SECURITE.md) ([English](SECURITY.md)).

## Fonctionnalités

### Éditeur
- Coloration GDScript avec les couleurs de l'éditeur Godot 4 (thème Godot ou Dracula)
- Autocomplétion pendant la frappe (mots-clés, annotations, types, fonctions courantes, mots du fichier)
- Indentation par tabulations, automatique après une ligne finissant par `:`
- **Erreurs en direct, comme dans Godot** : ligne fautive en rouge, ● dans la marge et explication dans la barre d'état (« : » oublié, parenthèses / crochets / guillemets non fermés, indentation incohérente, bloc vide, `=` au lieu de `==`…)
- Barre de touches : 🧩 modèles de code, flèches ← ↑ ↓ → (appui long = déplacement continu), Tab (`"` `(` `[` `{` ouvrent la paire, comme le clavier), `:`, `(`, `)`, `_`, `"`, `$`, `@`, `=`, `.`, `[]`, `{}`, `->`, `#`
- **Modèles de code 🧩** : 25 modèles (func, _ready, _process, signal, @export, @onready, for, match, await…) insérés à la bonne indentation
- ↶ Annuler, ↷ Rétablir, ☰ Plan du script (fonctions, signaux, constantes…)
- Recherche (Ctrl+F) et remplacer (Ctrl+H), avec respect des majuscules en option
- Onglets : plusieurs fichiers ouverts, point orange = modifié non envoyé, ⟳ = changé sur GitHub
- Taille du texte réglable, retour à la ligne en option
- Lignes modifiées repérées dans la marge : ● orange (nouvelle ou modifiée), ▸ orange (lignes supprimées), jusqu'à l'envoi
- Messages dans un bandeau en haut de l'écran : ✔ vert qui disparaît seul, ⚠ / ⛔ qui restent jusqu'à « OK »
- Clavier ouvert : la barre de touches reste visible (au-dessus du clavier sur le téléphone, en haut sous les onglets sur l'iPad iOS 12)

### GitHub
- Liste des fichiers du dépôt : affichage « Tout » ou « Par dossier », tri (nom, type, récemment ouverts), filtre, types de fichiers (scripts, scènes et ressources, tous)
- « ↻ Actualiser » lit toujours la liste fraîche et marque les nouveaux fichiers
- **Envoyer** : fenêtre « Vérifier avant d'envoyer » avec les différences ligne par ligne, les erreurs restantes et le message du commit
- **Envoi groupé** : plusieurs onglets modifiés envoyés en un seul commit ; chaque fichier peut être consulté (différences, erreurs) avant l'envoi
- **Historique 🕘** : 30 dernières versions d'un fichier, comparaison avec l'onglet, restauration
- ↻ Recharger un onglet depuis GitHub ; mise à jour automatique des onglets sans modifications
- Créer un script (avec modèle `extends`), renommer / déplacer et supprimer, le fichier `.gd.uid` de Godot 4.4+ suivant le script
- Détection des conflits si le fichier a changé sur GitHub depuis son ouverture
- Plusieurs dépôts ; jetons partagés entre dépôts ou un jeton par dépôt

### Hors ligne
- Bouton « Hors ligne » (📁) : garde une copie des scripts sur l'appareil et montre l'état (✔ 26/26, « 3 à màj ») ; dans la liste ✔ copie à jour, ⬇ copie ancienne ; Réglages › 📴 Hors ligne pour la place utilisée et l'effacement
- Sans Internet : ouvrir, modifier, créer, renommer, supprimer et envoyer (actions mises en attente ⏳) ; historique déjà consulté lisible
- Au retour d'Internet, fenêtre « Synchroniser » : pour chaque fichier, ↑ envoyer sa version ou ↓ reprendre celle de GitHub, avec comparaison ; conflits signalés ⚠ ; un seul commit par dépôt

### Appli
- **Tutoriel en bulles** au premier lancement, à revoir avec le bouton « ? » (📁) ou Réglages › ❓ Aide
- **Langue** : français ou anglais (Réglages › 🎨 Affichage), celle de l'appareil par défaut
- **🐞 Signaler un problème** (Réglages) : ouvre un signalement pré-rempli dans les [Issues](https://github.com/LutiinBlack/gd-pocket/issues) du dépôt, avec les infos techniques (jamais le jeton) ; brouillon gardé hors ligne
- Fenêtre « Nouvelle version » avec les nouveautés : « Mettre à jour » ou « Plus tard »
- Compatible avec les navigateurs récents et Safari 12 (iOS 12)

## Flux de travail avec Godot

1. GD Pocket : ouvrir → modifier → Envoyer (commit direct sur la branche).
2. PC (GitHub Desktop) et autres applis Git (GitSync) : faire un *pull* avant de modifier.
3. Un nouveau script doit encore être attaché à un nœud dans l'éditeur Godot.
4. Un nouveau modèle `.glb` : ouvrir le projet dans Godot avant de synchroniser, pour que le fichier `.glb.import` soit créé et envoyé.

## Limites

- La vérification en direct regarde la forme du code seulement : les variables inconnues, fautes de frappe dans les noms et erreurs de type restent à voir dans Godot.
- Autocomplétion par mots, sans analyse des types.
- Le renommage ne corrige pas les `preload()` / `load()` qui citent l'ancien chemin.
- Hors ligne, seuls les fichiers préparés (⬇) ou déjà ouverts sont disponibles, et seules les versions d'historique déjà consultées.
- iPad iOS 12 : la place du clavier est estimée (Safari 12 ne la donne pas).

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | l'appli entière (interface, éditeur, GitHub) |
| `sw.js` | service worker : cache hors ligne et mises à jour |
| `changelog.json` | nouveautés affichées dans la fenêtre « Nouvelle version » |
| `manifest.webmanifest`, `icons/` | installation sur l'écran d'accueil |
| `SECURITE.md`, `SECURITY.md` | sécurité du jeton (français, anglais) |

Publier une nouvelle version : changer `VERSION` dans `sw.js`, `APP_VERSION` dans `index.html`, ajouter une entrée en tête de `changelog.json`, puis pousser sur `main` (GitHub Pages met jusqu'à ~10 min à se mettre à jour).

## Historique

| Version | Date | Nouveautés |
|---|---|---|
| v0.14.0 | 09/11/2026 | Tutoriel en bulles, appli en anglais, 🐞 Signaler un problème, page sécurité du jeton, fenêtres ＋ et « Nouveau script » en blocs |
| v0.13.0 | 09/11/2026 | Bandeau de messages, « Aucun fichier à envoyer », lignes modifiées dans la marge, panneau 📁 en blocs, hors ligne plus clair |
| v0.12.1 | 08/11/2026 | Correctif clavier Samsung (saisie compatible Android), paires de la barre de touches |
| v0.12.0 | 04/11/2026 | Mode hors ligne et synchronisation, jetons partagés, différences fichier par fichier dans l'envoi groupé, flèches, barre de touches visible avec le clavier |
| v0.11.0 | 30/10/2026 | Erreurs en direct, vérification avant envoi, modèles de code, envoi groupé, historique d'un fichier, liste toujours à jour |
| v0.10.0 | 30/10/2026 | En-tête allégé (↶ ↷ ☰), recharger depuis GitHub, différences avant envoi, plan du script, taille du texte |
| v0.9.0 | 29/10/2026 | Plusieurs dépôts, réglages en deux colonnes, liste par dossier et tri |
| v0.8.0 | 29/10/2026 | Menu ＋, recherche et remplacer, barre du bas repliable, fenêtre « Nouvelle version » |
| v0.7.x | 28–29/10/2026 | Renommer / déplacer, compatibilité iOS 12, démarrage sur la liste |
| v0.1–v0.6 | 28/10/2026 | Prototype, PWA, connexion GitHub, couleurs Godot, onglets, création et suppression |

Basé sur [CodeMirror 5](https://codemirror.net/5/).
