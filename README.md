![photo](/Accueil1.png)
![photo](/Accueil2.png)


# --------------------- PREREQUISES ---------------------

Un serveur local de préférences WAMP , LAMP, XAMP qui inclus automatiquement Mysql, Apache et Php7

Installer symfony-cli sur https://symfony.com/download

# --------------------- MANUEL D'UTILISATION ---------------------

Renomer **.env** en **.env.local** et choisissez une base de donnée(decommentez-le en enlevant le #) et remplissez-le avec les informations de votre base de donnée local

Modifier **APP_ENV=dev** dans **.env.local**

Commande à exécuter avant de lancer l'APPLICATION

    * sudo xamp start 

ou

    * sudo service mysql start

Côté serveur(Symfony) dans /  

    * composer install
    * symfony console doctrine:database:dr­op --force
    * symfony console doctrine:database:cr­eate
    * symfony console doctrine:migrations:­migrate
    * symfony console doctrine:fixtures:lo­ad
    * symfony serve

Côté client(React) dans /

    * yarn
    * yarn encore dev --watch


# --------------------- LISTE  DES FONCTIONNALITES DE L'APPLICATION ---------------------

Onglet "Accueil"

    *Ajouter un nouveau dirigeant
    *Ajouter une nouvelle société

Onglet "Liste par catégorie"

    *Voir la liste des dirigeants inscrits
    *Voir la liste des sociétés inscrites
    *Filter les sociétés en fonction de ses  types, de ses villes et ses codes postals

# --------------------- PERSPECTIVES FUTURS ---------------------

Système d'authentification:

    * Inscription des sociétés
    * Inscription des dirigeants dans une société donnée (une société peut avoir 2 à n dirigeant)
    * Connexion (en tant qu'administrateur ou membre)

Gestion des affichages

    * Affichage des informations ou des actualités relatives à un utilisateur donnée

Gestion administrateur

    * Création, modification, suppression des membres
    * Publication des informations ou actualités
    * Modifier ou supprimer des publications

Filter

    * Filtrer des informations(dirigeants...)  en fonction des noms sociétés