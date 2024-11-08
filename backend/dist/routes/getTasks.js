"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = __importDefault(require("../data/tasks"));
const Utilities_1 = __importDefault(require("../utilities/Utilities"));
// ############################### Pour récupérer toutes les tâches  ###############################
function getTasks(req, res) {
    // Récupère toutes les tâches à partir du gestionnaire de tâches
    const tasks = tasks_1.default.getAllTasks();
    // Envoie une réponse avec le code HTTP 200 et la liste des tâches
    (0, Utilities_1.default)(res, 200, tasks);
}
// Exportation de la fonction pour l'utiliser dans d'autres fichiers
exports.default = getTasks;
