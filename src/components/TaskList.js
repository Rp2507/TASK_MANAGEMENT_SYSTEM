import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  toggleTaskStatus,
  updateTask,
} from "../redux-toolkit/taskSlice";
import TaskFilter from "./TaskFilter";
import TaskTimer from "./TaskTimer";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCreateTask = () => {
    setEditingTask(null); // Set to null for creating a new task
    setIsModalOpen(true); // Open the modal
  };

  const handleEditTask = (task) => {
    setEditingTask(task); // Set the task to be edited
    setIsModalOpen(true);

    console.log("model open");
    // Open the modal
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask(updatedTask));
    setEditingTask(null);
    setIsModalOpen(false); // Close the modal after updating
  };

  // Filter tasks based on priority and status
  const filteredTasks = tasks
    .filter((task) => {
      if (filterPriority !== "all" && task.priority !== filterPriority) {
        return false;
      }
      if (filterStatus === "completed" && !task.completed) {
        return false;
      }
      if (filterStatus === "pending" && task.completed) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
    });

  return (
    <div className="mt-4">
      {/* Create Task Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleCreateTask}
      >
        Create Task
      </button>

      <TaskFilter
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setSortOrder={setSortOrder}
      />

      {/* Task Form Modal */}
      <TaskForm
        task={editingTask}
        isOpen={isModalOpen} // Pass the modal state to the TaskForm
        onClose={() => setIsModalOpen(false)} // Close modal when needed
        onSubmit={handleUpdateTask}
      />

      {/* Task List */}
      <ul className="list-disc pl-5 space-y-4">
        {filteredTasks.map((task) => (
          <li key={task.id} className="border p-4 rounded shadow-sm space-y-1">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-xs text-gray-600">{task.description}</p>
            <p className="text-xs">Priority: {task.priority}</p>
            <p className="text-xs">
              Due Date: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p className="text-xs">
              Status: {task.completed ? "Completed" : "Pending"}
            </p>

            <TaskTimer task={task} />

            <div className="mt-2 flex gap-2">
              <button
                className={`px-4 py-2 rounded ${
                  task.completed
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
                onClick={() => dispatch(toggleTaskStatus(task.id))}
              >
                {task.completed ? "Mark as Pending" : "Mark as Completed"}
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => handleEditTask(task)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;