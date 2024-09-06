import { createSlice } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

const initialState = loadFromLocalStorage() || {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveToLocalStorage(state);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    startTimer: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task && !task.startTime) {
        task.startTime = Date.now(); // Set start time
      }
    },
    stopTimer: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task && task.startTime) {
        const timeSpent = Date.now() - task.startTime;
        task.timeSpent = (task.timeSpent || 0) + timeSpent;
        task.startTime = null; // Reset start time
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  startTimer,
  stopTimer,
} = taskSlice.actions;
export default taskSlice.reducer;
