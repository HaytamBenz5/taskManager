// Implement tasks here

// modele de tache
export interface Task {
  id: number;
  title: string;
}


class TaskManager {

  private tasks: Task[] = []; // C'est un tableau de taches 
  private nextId = 1; // c'est un identifiant pour la prochaine tache qui va etre créer

  // Pour récuperer toutes les taches , cette fonction renvoie un tableau de type tache
  public getAllTasks(): Task[] {
    return this.tasks;
  }

  // Methode pour ajouter une nouvelle tache
  public addTask(title: string): Task | Error {

   
    const titleExists = this.tasks.some(task => task.title === title);
    if (titleExists) {
      throw new Error('Please the title must be unique');
    }


    // Creation et ajout de la nouvelle tache
    const newTask: Task = {
      id: this.nextId++,
      title,
    };
    this.tasks.push(newTask);
    return newTask;
  }
}


// j'instancie un objet de la classe TaskManager

const taskManager = new TaskManager();

// j'ajoute quelques tests
taskManager.addTask('Learn TypeScript');
taskManager.addTask('Build a project');
taskManager.addTask('Review code');


export default taskManager;
