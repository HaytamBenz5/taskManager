import { IncomingMessage, ServerResponse } from "http";
import taskManager from "../data/tasks"; // Ajustez le chemin d'importation si nécessaire
import sendResponse from "../utilities/Utilities"; // Ajustez le chemin d'importation si nécessaire

function postTask(req: IncomingMessage, res: ServerResponse): void {
    let body: Buffer[] = [];

    // Collecte les données du corps de la requête
    req.on("data", chunk => { body.push(chunk); });

    req.on("end", () => {
        const taskData = Buffer.concat(body).toString(); // Combine les buffers en une seule chaîne

        let title: string;

        try {
            // Tente d'analyser les données JSON
            const parsedData = JSON.parse(taskData); // Analyse les données JSON
            title = parsedData.title; // Assigne le titre

            // Vérifie si le titre est fourni
            if (!title) {
                throw new Error("Please Title is required."); // Lève une erreur si le titre est absent
            }

            const newTask = taskManager.addTask(title);
            sendResponse(res, 201, newTask); // Répond avec la tâche créée et un statut 201
        } catch (error) {
            // Gère les erreurs, y compris les erreurs de JSON et le titre manquant
            if (error instanceof SyntaxError) {
                sendResponse(res, 400, { error: " Please JSON format must be valid." }); // Répond avec un statut 400 si le JSON est invalid
            } else {
                sendResponse(res, 400, { error: (error as Error).message }); // Répond avec un statut 400 et le message d'erreur
            }
        }
    });

    req.on("error", () => {
        sendResponse(res, 500, { error: "An error occurred while processing the request." }); // Gère les erreurs de requête
    });
}

export default postTask;
