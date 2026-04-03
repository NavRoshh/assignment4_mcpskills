(function () {
  const STORAGE_KEY = "simple-todo-poc.tasks";

  function createTodoApp({ storage, createId }) {
    let tasks = [];

    return {
      initialize,
      addTask,
      setTaskCompleted,
      deleteTask,
    };

    function initialize() {
      tasks = storage.load().filter(isValidTask);
      return createSnapshot(tasks);
    }

    function addTask(text) {
      const normalizedText = String(text).trim();
      if (!normalizedText) {
        return createSnapshot(tasks);
      }

      tasks = [
        {
          id: createId(),
          text: normalizedText,
          completed: false,
        },
        ...tasks,
      ];

      storage.save(tasks);
      return createSnapshot(tasks);
    }

    function setTaskCompleted(id, completed) {
      tasks = tasks.map((task) =>
        task.id === id
          ? { ...task, completed: Boolean(completed) }
          : task
      );

      storage.save(tasks);
      return createSnapshot(tasks);
    }

    function deleteTask(id) {
      tasks = tasks.filter((task) => task.id !== id);
      storage.save(tasks);
      return createSnapshot(tasks);
    }
  }

  function createLocalStorageAdapter(storageKey = STORAGE_KEY) {
    return {
      load() {
        try {
          const storedTasks = localStorage.getItem(storageKey);
          if (!storedTasks) {
            return [];
          }

          const parsed = JSON.parse(storedTasks);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      },
      save(tasks) {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
      },
    };
  }

  function createSnapshot(tasks) {
    const activeTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return {
      activeTasks,
      completedTasks,
      activeCount: activeTasks.length,
      completedCount: completedTasks.length,
      isEmpty: tasks.length === 0,
    };
  }

  function isValidTask(task) {
    return Boolean(
      task &&
      typeof task.id === "string" &&
      typeof task.text === "string" &&
      typeof task.completed === "boolean"
    );
  }

  window.TodoApp = {
    createTodoApp,
    createLocalStorageAdapter,
  };
})();
