import { saveTasksToLocalStorage, getTasks } from './app.js';

export function updateStatus(index, completed) {
  const tasks = getTasks();
  if (tasks[index]) {
    tasks[index].completed = completed;
    saveTasksToLocalStorage();
  }
}

export function toggleStatus(index) {
  const tasks = getTasks();
  if (tasks[index]) {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage();
  }
}
