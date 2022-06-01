import Express, { NextFunction, Request, Response } from "express";

// Récupérer le port des variables d'environnement ou préciser une valeur par défaut
const PORT = process.env.PORT || 5050;

// Créer l'objet Express
const app = Express();

// Créer un endpoint GET
app.get('/hello', 
  (request: Request, response: Response, next: NextFunction) => {
    response.send("<h1>Hello world!</h1>");
  }
);


// Lancer le serveur
app.listen(PORT,
  () => {
    console.info("API Listening on port " + PORT);
  }
);
