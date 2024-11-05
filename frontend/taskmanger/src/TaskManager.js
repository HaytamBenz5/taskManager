import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// ##################   Composant principal pour la gestion des tâches  ###################

export const TaskManager = () => {

    //  ###############################  Consts  ###############################



  const { register, handleSubmit, reset } = useForm();
  const [tasks, setTasks] = useState([]); // État pour stocker les tâches
  const [loading, setLoading] = useState(false); // État pour indiquer le chargement
  const [error, setError] = useState(null); // État pour les erreurs
  const [isSwapped, setIsSwapped] = useState(false); // État pour basculer entre la création de tâches et la liste des tâches
  const [alertMessage, setAlertMessage] = useState(""); // État pour les messages d'alerte
  const [alertType, setAlertType] = useState(""); // État pour le type d'alerte ("success", "error")



  //  ############################### Utiliser useEffect pour charger les tâches au démarrage ###############################



  useEffect(() => { 
    document.title = "Task Manager"; // c'est juste pour changer le titre de notre page
    fetchTasks(); 
  }, []);



  // ############################### Fonction pour récupérer les tâches depuis l'API ###############################



  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTasks(data); // Mettre à jour l'état avec les tâches récupérées
    } catch (error) {
      console.error("Failed to retrieve tasks:", error);
      setError(error.message); // Gérer les erreurs
    } finally {
      setLoading(false); // Fin du chargement
    }
  };




  // ###############################   Fonction pour ajouter une nouvelle tâche ###############################



  const addTask = async (task) => {

    setLoading(true);


    try {

      // La methode Fetch qui nous permet de reagir avec Notre API de BACK NodeJs ( TypeScript Compilé en JavaScript)
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task), // Convertir l'objet tâche en chaîne JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlertMessage(errorData.error); // Afficher le message d'erreur si la tâche n'est pas ajoutée
        setAlertType("error"); // Définir le type d'alerte sur "error"
        throw new Error("Failed to add task"); // cela dégage une exeception 
          }

      const newTask = await response.json(); // Récupérer la nouvelle tâche ajoutée
      setTasks((prevTasks) => [...prevTasks, newTask]); // Mettre à jour l'état des tâches
      reset(); // Réinitialiser le formulaire
      setAlertMessage("Task added successfully!"); // Message de succès
      setAlertType("success"); // Définir le type d'alerte sur "success"

    } catch (error) {
      // ce block  permet de detecter les exceptions detectées
      console.error("Failed to add task:", error);
      setError(error.message); // Gérer les erreurs
    
    } finally {
        //Ce block est toujours executé c'est le block finally
      setLoading(false); // Fin du chargement
    
    }


  };


  // ###############################  Fonction de soumission du formulaire  ###############################

  const onSubmit = handleSubmit((data) => {
    addTask(data); // Appeler la fonction pour ajouter une tâche
  });




  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white font-montserrat">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-6 md:px-20 text-center">
        <div className="flex flex-col lg:flex-row w-full lg:w-2/3 max-w-5xl bg-white border border-gray-300">
          {isSwapped ? (
            <div className="w-full lg:w-2/2 p-6">
              <form onSubmit={onSubmit} className="mb-[10px]">

             {/* ###############################  Pour les messages de retour soit succes ou echec  ############################### */} 

              {alertMessage && alertType === "error" && ( // Afficher le message d'erreur en jaune
                  <div className="flex items-center p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-lg" role="alert">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v7a1 1 0 11-2 0V3a1 1 0 011-1zM10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{alertMessage}</span>
                  </div>
                )}

                {alertMessage && alertType === "success" && ( // Afficher le message de succès en vert
                  <div className="flex items-center p-4 mb-4 text-green-700 bg-green-100 border border-green-300 rounded-lg" role="alert">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 2a1 1 0 011 1v7a1 1 0 11-2 0V3a1 1 0 011-1zM10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                    </svg>
                    <span>{alertMessage}</span>
                  </div>
                )}

                <div className="py-6 md:py-10 mr-0">
                  <h2 className="text-4xl md:text-5xl font-extrabold">
                    <span className="text-black">Task</span>
                    <span className="text-indigo-600">Manager</span>
                  </h2>
                  <p className="text-black text-[14px]  mt-[5px] text-center font-semibold">
                  This is a basic page designed for API testing !
                  </p>

                </div>

                {/* ###############################  Champ pour le nom de la tâche  ############################### */}

                <div className="mb-4">
                  <label className="block text-left mb-2 font-medium">Task Name:</label>
                  <div className="relative">
                    <input
                      {...register("title", { required: true })} // Enregistrement du champ de saisie avec validation requise
                      type="text"
                      placeholder="Task name"
                      className="bg-gray-100 outline-none w-full py-3 px-4 rounded-lg text-base shadow-sm border border-gray-300"
                    />
                  </div>
                </div>

                {/* ###############################  Boutons d'action  ###############################  */}
                <div>
                  <button type="submit" className="w-full py-3 mb-4 bg-indigo-600 hover:bg-indigo-800 text-white text-sm font-bold uppercase tracking-widest rounded-lg">
                    Add the task
                  </button>
                  <button
                    type="button"
                    className="w-full py-3 flex justify-center items-center bg-white hover:bg-gray-100 border border-gray-300 text-black text-sm font-bold uppercase rounded-lg"
                    onClick={() => {
                      setIsSwapped(!isSwapped); // Bascule l'état d'affichage
                      setAlertMessage(""); // Réinitialiser le message d'alerte
                      reset(); // Effacer l'entrée lors du changement de vue
                    }}
                  >
                    View Tasks
                  </button>
                </div>
              </form>
              <p className="text-black text-[14px] ml-[20px] text-right font-bold">
                     <a href="https://haytambenz5.github.io/MyPortfolio/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">BENZINANE Haitam</a>
              </p>
            </div>
          ) : (
            <div className="w-full lg:w-2/2 p-6">
              <div className="py-6 md:py-10 mr-0 mb-[20px]">
                <h2 className="text-4xl md:text-5xl font-extrabold">
                  <span className="text-black">Task</span>
                  <span className="text-indigo-600"> Manager</span>
                </h2>
                <p className="text-black text-[14px]  mt-[5px] text-center font-semibold">
                This is a basic page designed for API testing !
                  </p>
              </div>

              <label className="block text-left mb-2 font-medium">List of tasks:</label>

              <div className="container mx-auto p-4">
                <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-indigo-600 text-white">
                        <th className="py-2 px-4 border-b">Task ID</th>
                        <th className="py-2 px-4 border-b">Task Title</th>
                      </tr>
                    </thead>
                    <tbody>
                       {/* ###############################  Pour remplissage du tableau  ###############################  */}
                      {tasks.length === 0 ? (
                        <tr>
                          <td colSpan="2" className="py-2 px-4 text-center">No tasks available</td>
                        </tr>
                      ) : (
                                       
                        tasks.map((task, index) => (
                          <tr className="hover:bg-gray-100" key={index}>
                            <td className="py-2 px-4 border-b">{task.id}</td>
                            <td className="py-2 px-4 border-b">{task.title}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full py-3 mb-4 bg-indigo-600 hover:bg-indigo-800 text-white text-sm font-bold uppercase tracking-widest rounded-lg"
                  onClick={() => setIsSwapped(!isSwapped)} // Bascule l'état d'affichage
                >
                  Create a task
                </button>
              </div>

              <p className="text-black text-[14px] ml-[20px] text-right font-bold">
                     <a href="https://haytambenz5.github.io/MyPortfolio/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">BENZINANE Haitam</a>
              </p>



            </div>
          )}
        </div>
      </main>
    </div>
  );
};
