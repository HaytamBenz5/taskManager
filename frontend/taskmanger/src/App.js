import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { TaskManager } from "./TaskManager";

function App() {
  return (
    // ################# Implementation des routes de notre modèle ######################
    // http://localhost:3001/taskManager
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/taskManager" replace />} />
        <Route path="/taskManager" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;

