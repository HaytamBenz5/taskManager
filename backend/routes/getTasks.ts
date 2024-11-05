import { IncomingMessage, ServerResponse } from "http";
import taskManager from "../data/tasks"; 
import sendResponse from "../utilities/Utilities";

// ############################### Pour récupérer toutes les tâches  ###############################

function getTasks(req: IncomingMessage, res: ServerResponse): void {
    // Récupère toutes les tâches à partir du gestionnaire de tâches
    const tasks = taskManager.getAllTasks();
    
    // Envoie une réponse avec le code HTTP 200 et la liste des tâches
    sendResponse(res, 200, tasks);
}

// Exportation de la fonction pour l'utiliser dans d'autres fichiers
export default getTasks;
