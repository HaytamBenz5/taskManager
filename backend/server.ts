import * as http from "http";
import router from "./router";

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001"); // Autoriser uniquement l'origine http://localhost:3001 du React
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Méthodes autorisées
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // En-têtes autorisés

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204); // Pas de contenu
    res.end();
    return;
  }

  // Call the router to handle other requests
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
