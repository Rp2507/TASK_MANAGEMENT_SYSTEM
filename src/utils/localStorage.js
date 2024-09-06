export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load from localStorage", err);
    return undefined;
  }
};

export const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("tasks", serializedState);
  } catch (err) {
    console.error("Could not save to localStorage", err);
  }
};
