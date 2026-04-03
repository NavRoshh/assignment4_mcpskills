const STORAGE_KEY = "simple-todo-poc.tasks";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const emptyState = document.querySelector("#empty-state");
const activeList = document.querySelector("#active-list");
const completedList = document.querySelector("#completed-list");
const activeCount = document.querySelector("#active-count");
const completedCount = document.querySelector("#completed-count");
const taskTemplate = document.querySelector("#task-template");

let tasks = loadTasks();

render();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });

  saveTasks();
  render();
  form.reset();
  input.focus();
});

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (!storedTasks) {
      return [];
    }

    const parsed = JSON.parse(storedTasks);
    return Array.isArray(parsed)
      ? parsed.filter(isValidTask)
      : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function isValidTask(task) {
  return Boolean(
    task &&
    typeof task.id === "string" &&
    typeof task.text === "string" &&
    typeof task.completed === "boolean"
  );
}

function render() {
  activeList.replaceChildren();
  completedList.replaceChildren();

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  activeTasks.forEach((task) => {
    activeList.append(createTaskElement(task));
  });

  completedTasks.forEach((task) => {
    completedList.append(createTaskElement(task));
  });

  activeCount.textContent = String(activeTasks.length);
  completedCount.textContent = String(completedTasks.length);
  emptyState.hidden = tasks.length > 0;
}

function createTaskElement(task) {
  const fragment = taskTemplate.content.cloneNode(true);
  const item = fragment.querySelector(".task-item");
  const checkbox = fragment.querySelector(".task-checkbox");
  const text = fragment.querySelector(".task-text");
  const deleteButton = fragment.querySelector(".delete-button");

  item.dataset.taskId = task.id;
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark "${task.text}" as ${task.completed ? "incomplete" : "complete"}`);
  text.textContent = task.text;
  deleteButton.setAttribute("aria-label", `Delete "${task.text}"`);

  checkbox.addEventListener("change", () => {
    tasks = tasks.map((currentTask) =>
      currentTask.id === task.id
        ? { ...currentTask, completed: checkbox.checked }
        : currentTask
    );

    saveTasks();
    render();
  });

  deleteButton.addEventListener("click", () => {
    tasks = tasks.filter((currentTask) => currentTask.id !== task.id);
    saveTasks();
    render();
    input.focus();
  });

  return fragment;
}
