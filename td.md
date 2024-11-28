# TD - API Rest - Gestion de listes de films

Nous allons continuer notre API Rest pour qu'elle ressemble davantage a une API complète, en développant de nouvelles fonctionnalités. L'objectif est qu'en continuant le cours après le TD, on puisse utiliser votre code pour lui ajouter la BDD en mongoosse, et le serveur express.

## Objectifs

Notre application va être une application de gestion de liste de films. Un utilisateur va pouvoir créer plusieurs listes de films, et ajouter des films à ces listes. Une liste de films est composée d'un titre, et d'une liste de films.

{"adult":false,"backdrop_path":"/ffdqHMWkh1h9MABwIfbfRJhgFW6.jpg","id":218,"original_language":"en","original_title":"The Terminator","overview":"À Los Angeles en 1984, un Terminator, cyborg surgi du futur, a pour mission d'exécuter Sarah Connor, une jeune femme dont l'enfant à naître doit sauver l'humanité. Kyle Reese, un résistant humain, débarque lui aussi pour combattre le robot, et aider la jeune femme…","popularity":82.51,"poster_path":"/z9nwlPCvMpgxDwQ9JQ3zRAPpEjd.jpg","release_date":"1984-10-26","title":"Terminator","video":false,"vote_average":7.663,"vote_count":13152}

Nous avons déja géré les films, dont nous avons un exemple au dessus, qui contient les informations suivantes:

-   adult: une variable qui indique si le film est réservé aux adultes
-   backdrop_path: le chemin de l'image de fond du film
-   id: l'id du film
-   original_language: la langue originale du film
-   original_title: le titre original du film
-   overview: le résumé du film
-   popularity: la popularité du film
-   poster_path: le chemin de l'affiche du film
-   release_date: la date de sortie du film
-   title: le titre du film
-   video: une variable qui indique si une vidéo est disponible pour le film
-   vote_average: la note moyenne du film
-   vote_count: le nombre de votes

Nous allons maintenant ajouter les listes de films. Une liste de films est composée d'un titre, et d'une liste de films. Nous devons pouvoir identifier le propriétaire de la liste de films, et les films doivent être des films existants.

Exemple :

```json
{
	"title": "A voir avec les enfants",
	"idOwner": "2",
	"idMovies": [218, 219, 220]
},
{
    "title": "A voir avec les amis",
    "idOwner": "2",
    "idMovies": [221, 222, 223]
},
{
    "title": "Mes plaisirs coupables",
    "idOwner": "3",
    "idMovies": [224, 225, 226]
}
```

Cela peut faire peur et vous êtes en train de vous demander comment vous allez faire pour gérer tout ça. Pas de panique, on va y aller étape par étape.

## Etape 1 - Mise en place (temps estimé : 5 a 20min)

Nous avons déja notre fichier `movies.json` qui contient les films. Nous allons créer un fichier `lists.json` qui contiendra les listes de films. Nous allons commencer par créer un tableau vide `lists` dans ce fichier.

```json
[]
```

## Etape 2 - Création des routes (temps estimé : 1h a 2h, peut être plus selon votre niveau en algorithmie)

Nous allons créer les routes suivantes :

-   Récupérer toutes les listes : `GET /lists`
-   Récupérer toutes les listes d'un utilisateur : `GET /lists/users/:idOwner`
-   Récupérer une liste par son id : `GET /lists/:id`
-   Créer une liste : `POST /lists`
-   Supprimer une liste : `DELETE /lists/:id`
-   Modifier le titre d'une liste : `PUT /lists/:id`
-   Ajouter un film à une liste : `POST /lists/:id/movies`
-   Supprimer un film d'une liste : `DELETE /lists/:id/movies/:idMovie`

Comme vous pouvez le voir, les routes respectent les conventions REST. Cela permet de comprendre facilement ce que fait chaque route.

Vous pouvez fonctionner par baby steps, en commençant par la route `GET /lists`, puis en déclarant les routes une par une, dans le fichier `index.js`.

TIPS :

-   Il faudra toutefois penser a extraire les routes qui ont des élements en commun dans un router, pour avoir une meilleure organisation de votre code.
-   Si l'on observer bien les routes, on peut voir que toutes partagent un point commun : elles comment toutes par `/lists`. On peut donc créer un router `lists.js` qui contiendra toutes les routes qui commencent par `/lists`.
-   BONUS : Ensuite, on peut voir qu'une partie de ces routes partagent un autre point commun : elles permettent de modifier les films d'une liste. On peut donc créer un router `moviesLists.js` qui contiendra toutes les routes qui commencent par `/lists/:id/movies`.

Pour chaque route, nous allons devoir gérer des cas d'erreurs. Par exemple, si on essaie de récupérer une liste qui n'existe pas, on doit renvoyer une erreur 404. Si on essaie de créer une liste sans titre, on doit renvoyer une erreur 400.

Voici les cas d'erreurs à gérer :

### GET /lists/:id

-   Si la liste n'existe pas, renvoyer une erreur 404
-   Si l'id n'est pas un nombre, renvoyer une erreur 400

### POST /lists

-   Si il manque le titre, renvoyer une erreur 400
-   Si il manque l'idOwner, renvoyer une erreur 400

### DELETE /lists/:id

-   Si la liste n'existe pas, renvoyer une erreur 404
-   Si l'id n'est pas un nombre, renvoyer une erreur 400

### PUT /lists/:id

-   Si la liste n'existe pas, renvoyer une erreur 404
-   Si l'id n'est pas un nombre, renvoyer une erreur 400
-   Si il manque le titre, renvoyer une erreur 400
-   Si l'on essaie de modifier l'idOwner, renvoyer une erreur 400

### POST /lists/:id/movies

-   Si la liste n'existe pas, renvoyer une erreur 404
-   Si l'id n'est pas un nombre, renvoyer une erreur 400
-   Si le film n'existe pas, renvoyer une erreur 404
-   Si l'idMovie n'est pas un nombre, renvoyer une erreur 400

### DELETE /lists/:id/movies/:idMovie

-   Si la liste n'existe pas, renvoyer une erreur 404
-   Si l'id n'est pas un nombre, renvoyer une erreur 400
-   Si le film n'existe pas, renvoyer une erreur 404
-   Si l'idMovie n'est pas un nombre, renvoyer une erreur 400

S'il y a des erreurs que je n'ai pas mentionné, n'hésitez pas à les ajouter et nous en discuterons.

## Etape 3 - Isolement des controllers (temps estimé : 30min a 1h)

Nous allons isoler les controllers dans un dossier `controllers`. Chaque controller pour une entité aura son propre fichier. Par exemple, le controller pour les listes sera dans `controllers/listsController.js`. Nous pouvons isoler les controllers pour les films des listes dans un dossier `controllers/moviesListController.js`.

## Etape 4 - Isolement des models (temps estimé : 30min a 1h)

Rappel : un model est une représentation d'une entité, qui permet de gérer les données de cette entité. Elle permet de faire des opérations sur les données, comme les récupérer, les modifier, les supprimer, etc. Celà permet de séparer la logique de la base de données de la logique de l'application. Et si l'on doit changer de base de données, on ne change que le model, on sait où intervenir.

C'est un peu comme un chirurgien qui doit opérer un patient. Il ne va pas opérer le patient n'importe comment : s'il doit faire une opération sur le coeur, il va ouvrir la cage thoracique, et s'il doit faire une opération sur le cerveau, il va ouvrir le crâne. Il ne va pas ouvrir le crâne pour opérer le coeur, et il ne va pas ouvrir la cage thoracique pour opérer le cerveau.

Nous allons isoler les models dans un dossier `models`. Chaque model pour une entité aura son propre fichier. Par exemple, le model pour les listes sera dans `models/listsModel.js`. Nous pouvons isoler les models pour les films des listes dans un dossier `models/moviesListModel.js`.

## Etape de bonus - Middleware (temps estimé : 30min a 1h)

Nous allons créer un middleware qui va vérifier si l'utilisateur est bien le propriétaire de la liste. Ce middleware sera utilisé pour les routes qui nécessitent de vérifier si l'utilisateur est bien le propriétaire de la liste.

Voici les routes qui nécessitent de vérifier si l'utilisateur est bien le propriétaire de la liste :

-   Supprimer une liste : `DELETE /lists/:id`
-   Modifier le titre d'une liste : `PUT /lists/:id`
-   Ajouter un film à une liste : `POST /lists/:id/movies`
-   Supprimer un film d'une liste : `DELETE /lists/:id/movies/:idMovie`

## Etape de bonus - Stocker les données sur la géolocalisation utilisateurs (temps estimé : 30min a 1h)

Nous allons stocker les données sur la géolocalisation des utilisateurs. Nous allons stocker les données dans un fichier `geolocalisation.json`. Ce fichier contiendra les données suivantes :

```json
[
	{
		"id": 1,
		"latitude": 48.8566,
		"longitude": 2.3522
	},
	{
		"id": 2,
		"latitude": 48.8566,
		"longitude": 2.3522
	},
	{
		"id": 3,
		"latitude": 48.8566,
		"longitude": 2.3522
	}
]
```
