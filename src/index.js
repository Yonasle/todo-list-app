import './styles.css';
import {
  addTask,
  deleteTask,
  getTasks,
  toggleDeleteIcon,
  toggleEditMode,
} from './app.js';

const todoList = document.getElementById('todo-list');

function renderTasks() {
  todoList.innerHTML = '';
  const tasks = getTasks();

  tasks.forEach((task, index) => {
    const taskRow = document.createElement('tr');
    taskRow.className = 'todo-item';
    taskRow.innerHTML = `
      <td>
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
      </td>
      <td class="${task.completed ? 'completed' : ''}">
        ${task.showEdit ? `<input type="text" class="edit-input" value="${task.description}" />` : task.description}
      </td>
    `;

    const kebabCell = document.createElement('td');
    kebabCell.className = 'kebab-icon';
    const kebabIcon = document.createElement('i');
    kebabIcon.className = `fas fa-ellipsis-v ${task.showDeleteIcon ? 'red' : ''}`;
    kebabCell.appendChild(kebabIcon);

    kebabIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleDeleteIcon(index);
      toggleEditMode(index);
      renderTasks();
    });

    if (task.showDeleteIcon) {
      const deleteCell = document.createElement('td');
      deleteCell.className = 'delete-icon';
      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'fas fa-trash-alt';
      deleteCell.appendChild(deleteIcon);

      deleteIcon.addEventListener('click', () => {
        deleteTask(task.index);
        renderTasks();
      });

      taskRow.appendChild(deleteCell);
    }

    taskRow.appendChild(kebabCell);
    todoList.appendChild(taskRow);
  });
}

renderTasks();

const newTodoInput = document.getElementById('newTodo');
newTodoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const newTaskDescription = newTodoInput.value.trim();
    if (newTaskDescription !== '') {
      addTask(newTaskDescription);
      newTodoInput.value = '';
      renderTasks();
    }
  }
});

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', () => {
  const newTaskDescription = newTodoInput.value.trim();
  if (newTaskDescription !== '') {
    addTask(newTaskDescription);
    newTodoInput.value = '';
    renderTasks();
  }
});

const clearCompletedButton = document.getElementById('clearCompletedButton');
clearCompletedButton.addEventListener('click', () => {
  deleteTask((task) => task.completed);
  renderTasks();
});
