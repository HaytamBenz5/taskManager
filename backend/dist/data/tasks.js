"use strict";
// Implement tasks here
Object.defineProperty(exports, "__esModule", { value: true });
class TaskManager {
    constructor() {
        this.tasks = []; // C'est un tableau de taches 
        this.nextId = 1; // c'est un identifiant pour la prochaine tache qui va etre créer
    }
    // Pour récuperer toutes les taches , cette fonction renvoie un tableau de type tache
    getAllTasks() {
        return this.tasks;
    }
    // Methode pour ajouter une nouvelle tache
    addTask(title) {
        const titleExists = this.tasks.some(task => task.title === title);
        if (titleExists) {
            throw new Error('Please the title must be unique');
        }
        // Creation et ajout de la nouvelle tache
        const newTask = {
            id: this.nextId++,
            title,
        };
        this.tasks.push(newTask);
        return newTask;
    }
}
const taskManager = new TaskManager();
// Quelques tests
taskManager.addTask('Learn TypeScript');
taskManager.addTask('Build a project');
taskManager.addTask('Review code');
exports.default = taskManager;