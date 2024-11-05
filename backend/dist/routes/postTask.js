"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = __importDefault(require("../data/tasks")); // Ajustez le chemin d'importation si nécessaire
const Utilities_1 = __importDefault(require("../utilities/Utilities")); // Ajustez le chemin d'importation si nécessaire
function postTask(req, res) {
    let body = [];
    // Collecte les données du corps de la requête
    req.on("data", chunk => { body.push(chunk); });
    req.on("end", () => {
        const taskData = Buffer.concat(body).toString(); // Combine les buffers en une seule chaîne
        let title;
        try {
            // Tente d'analyser les données JSON
            const parsedData = JSON.parse(taskData); // Analyse les données JSON
            title = parsedData.title; // Assigne le titre
            // Vérifie si le titre est fourni
            if (!title) {
                throw new Error("Please Title is required."); // Lève une erreur si le titre est absent
            }
            const newTask = tasks_1.default.addTask(title);
            (0, Utilities_1.default)(res, 201, newTask); // Répond avec la tâche créée et un statut 201
        }
        catch (error) {
            // Gère les erreurs, y compris les erreurs de JSON et le titre manquant
            if (error instanceof SyntaxError) {
                (0, Utilities_1.default)(res, 400, { error: " Please JSON format must be valid." }); // Répond avec un statut 400 si le JSON est invalid
            }
            else {
                (0, Utilities_1.default)(res, 400, { error: error.message }); // Répond avec un statut 400 et le message d'erreur
            }
        }
    });
    req.on("error", () => {
        (0, Utilities_1.default)(res, 500, { error: "An error occurred while processing the request." }); // Gère les erreurs de requête
    });
}
exports.default = postTask;
