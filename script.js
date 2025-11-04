const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(t => addTaskToDOM(t.text, t.completed));
}

function addTaskToDOM(taskText, completed = false) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `
    <span class="${completed ? 'completed' : ''}">${taskText}</span>
    <div>
      <button class="btn btn-success btn-sm me-2 doneBtn">✔</button>
      <button class="btn btn-danger btn-sm deleteBtn">✖</button>
    </div>
  `;
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').innerText,
      completed: li.querySelector('span').classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText !== '') {
    addTaskToDOM(taskText);
    saveTasks();
    input.value = '';
  }
});

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('doneBtn')) {
    e.target.parentElement.parentElement.querySelector('span').classList.toggle('completed');
    saveTasks();
  } else if (e.target.classList.contains('deleteBtn')) {
    e.target.parentElement.parentElement.remove();
    saveTasks();
  }
});

window.addEventListener('load', loadTasks);
