import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

// Load initial state from localStorage
const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState,
});

// Save the Redux state to localStorage when state changes
store.subscribe(() => {
  saveToLocalStorage({
    tasks: store.getState().tasks,
  });
});

