import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./index.css";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateTask = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4 text-red-600 text-center">
        Task Management System
      </h1>
      {showForm && <TaskForm onClose={handleCloseForm} />}
      <TaskList />
    </div>
  );
};

export default App;
