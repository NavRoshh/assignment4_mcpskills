# Issue Breakdown: Simple To-Do Web App Proof of Concept

Parent PRD: local `PRD.md` (no GitHub PRD issue number assigned yet)

## Issue 1: App Shell and Task Entry

**Type:** AFK  
**Blocked by:** None - can start immediately  
**User stories addressed:** 1, 2, 3, 4, 5, 7, 8, 16, 20, 23

### What to build

Build the first end-to-end slice of the single-page to-do app so a user can open the webpage, understand the interface, and add tasks through a clear input flow. This slice should include the app shell, task entry UI, keyboard and button submission, empty-state behavior, and invalid-input handling.

### Acceptance criteria

- [ ] A user can open the app as a simple webpage and see a clear single-page layout.
- [ ] A user can type a task and submit it using either the Enter key or the Add Task button.
- [ ] Empty or whitespace-only submissions are rejected without creating a task.
- [ ] The input remains focused after an invalid submission.
- [ ] A friendly empty-state message is shown when there are no tasks.

## Issue 2: Active Task Workflow

**Type:** AFK  
**Blocked by:** Issue 1  
**User stories addressed:** 6, 17, 20, 22, 24

### What to build

Extend the first slice so newly created tasks are rendered in the active list in a predictable and demoable way. This slice should make active tasks visible, place new tasks at the top, and expose the active-task count clearly in the interface.

### Acceptance criteria

- [ ] Newly added tasks appear in the active section of the page.
- [ ] New tasks are inserted at the top of the active list.
- [ ] The active task count updates to match the visible active items.
- [ ] The task rendering remains simple and understandable for a class demo.

## Issue 3: Completion and Deletion Flow

**Type:** AFK  
**Blocked by:** Issue 2  
**User stories addressed:** 9, 10, 11, 12, 13, 17, 20, 23

### What to build

Add the next end-to-end task lifecycle behavior so users can finish and remove work. This slice should let users mark tasks as completed, move them into a dedicated completed section with subdued styling, and delete tasks from the interface while keeping task counts accurate.

### Acceptance criteria

- [ ] A user can mark an active task as completed.
- [ ] Completing a task moves it into a completed section instead of hiding it.
- [ ] Completed tasks remain visible with subdued styling that communicates status.
- [ ] A user can delete tasks from the list.
- [ ] Active and completed task counts stay accurate after completion and deletion actions.

## Issue 4: Persistence and Reload Behavior

**Type:** AFK  
**Blocked by:** Issue 2  
**User stories addressed:** 14, 15, 21, 24

### What to build

Add browser-based persistence so the proof of concept behaves like a functional app rather than a temporary demo. This slice should save tasks and completion state in local storage and restore them automatically when the page is reloaded.

### Acceptance criteria

- [ ] Tasks are saved in browser local storage.
- [ ] Completed state is also saved in browser local storage.
- [ ] Reloading the page restores both tasks and their completion state.
- [ ] The app continues to function correctly after restoring saved state.

## Issue 5: Responsive Polish and Manual Verification

**Type:** AFK  
**Blocked by:** Issue 3, Issue 4  
**User stories addressed:** 18, 19, 22, 23

### What to build

Finish the proof of concept with presentation-ready polish for the assignment demo. This slice should improve the visual finish across desktop and mobile layouts and include manual verification of the full user flow so the app is easy to evaluate and easy to present.

### Acceptance criteria

- [ ] The layout remains usable and visually clear on both desktop and mobile screen sizes.
- [ ] The app feels minimal but polished rather than barebones.
- [ ] Manual verification covers add, invalid input, complete, delete, and reload persistence flows.
- [ ] The final experience remains intentionally small in scope and easy to understand at a glance.
