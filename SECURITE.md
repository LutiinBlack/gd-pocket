# Sécurité de ton jeton GitHub

*[English version](SECURITY.md)*

GD Pocket a besoin d'un jeton GitHub pour lire et envoyer tes scripts. Voici comment il est utilisé et comment le protéger.

## Un jeton limité
Crée sur GitHub un jeton *fine-grained* : <https://github.com/settings/personal-access-tokens/new>
- limité aux **seuls dépôts** que tu veux modifier avec GD Pocket ;
- avec uniquement la permission **Contents : Read and write** ;
- avec une **date d'expiration**.

## Où il est gardé
Uniquement **sur ton appareil**, dans le stockage de l'appli (localStorage). Il n'est envoyé qu'à `api.github.com`, en HTTPS.

## Ce que l'appli ne fait jamais
Pas de serveur GD Pocket, pas de compte, pas de statistiques, pas de publicité. Le code est public et vérifiable dans ce dépôt. Le formulaire « 🐞 Signaler un problème » n'ajoute jamais le jeton.

## Téléphone perdu ou vendu
Révoque le jeton sur GitHub (Settings › Developer settings › Personal access tokens), puis crées-en un nouveau.

## Expiration
Crée un nouveau jeton et colle-le dans Réglages › 🔑 Jetons › Remplacer : tous les dépôts qui l'utilisent sont mis à jour.

## Limites
Sur un appareil partagé ou sans verrouillage, quelqu'un qui ouvre l'appli peut utiliser le jeton. Un jeton par appareil permet d'en révoquer un seul.

## Signaler une faille
Ouvre un signalement dans [Issues](https://github.com/LutiinBlack/gd-pocket/issues) sans y mettre de jeton ni d'information privée.
