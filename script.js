const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const emptyState = document.querySelector("#empty-state");
const activeList = document.querySelector("#active-list");
const completedList = document.querySelector("#completed-list");
const activeCount = document.querySelector("#active-count");
const completedCount = document.querySelector("#completed-count");
const taskTemplate = document.querySelector("#task-template");

const app = window.TodoApp.createTodoApp({
  storage: window.TodoApp.createLocalStorageAdapter(),
  createId: () => crypto.randomUUID(),
});

let snapshot = app.initialize();

render(snapshot);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const previousActiveCount = snapshot.activeCount;
  snapshot = app.addTask(input.value);

  if (snapshot.activeCount === previousActiveCount) {
    input.focus();
    return;
  }

  render(snapshot);
  form.reset();
  input.focus();
});

function render(currentSnapshot) {
  activeList.replaceChildren();
  completedList.replaceChildren();

  currentSnapshot.activeTasks.forEach((task) => {
    activeList.append(createTaskElement(task));
  });

  currentSnapshot.completedTasks.forEach((task) => {
    completedList.append(createTaskElement(task));
  });

  activeCount.textContent = String(currentSnapshot.activeCount);
  completedCount.textContent = String(currentSnapshot.completedCount);
  emptyState.hidden = !currentSnapshot.isEmpty;
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
    snapshot = app.setTaskCompleted(task.id, checkbox.checked);
    render(snapshot);
  });

  deleteButton.addEventListener("click", () => {
    snapshot = app.deleteTask(task.id);
    render(snapshot);
    input.focus();
  });

  return fragment;
}
