import React, { useState, useEffect, useCallback } from "react";
import { Task, FilterStatus } from "./types";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";

function App() {
  // --- STATE ---
  // All our data lives here and gets passed down to child components

  const [tasks, setTasks] = useState<Task[]>([]); // List of tasks from the API
  const [searchTerm, setSearchTerm] = useState(""); // What the user typed in search
  const [filter, setFilter] = useState<FilterStatus>("all"); // Which filter is active
  const [editingTask, setEditingTask] = useState<Task | null>(null); // Task being edited (or null)
  const [loading, setLoading] = useState(false); // Show loading spinner
  const [error, setError] = useState(""); // Error message to show

  // --- LOAD TASKS ---
  // This runs when the app starts, and whenever search or filter changes
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTasks(searchTerm, filter);
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filter]);

  // useEffect calls loadTasks whenever searchTerm or filter changes
  // The small delay (300ms) prevents calling the API on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 300);

    return () => clearTimeout(timer);
  }, [loadTasks]);

  // --- ADD TASK ---
  const handleAddTask = async (title: string, description: string) => {
    try {
      await createTask(title, description);
      loadTasks(); // Refresh the list
    } catch (err) {
      setError("Failed to add task.");
    }
  };

  // --- UPDATE TASK (full update - title + description) ---
  const handleUpdateTask = async (
    taskId: number,
    title: string,
    description: string
  ) => {
    try {
      await updateTask(taskId, { title, description });
      setEditingTask(null); // Close the edit form
      loadTasks(); // Refresh the list
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  // --- TOGGLE COMPLETE/INCOMPLETE ---
  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      loadTasks(); // Refresh the list
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  // --- DELETE TASK ---
  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      // If we were editing this task, stop editing
      if (editingTask?.id === taskId) {
        setEditingTask(null);
      }
      loadTasks(); // Refresh the list
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  // --- RENDER ---
  return (
    <div className="app">
      <h1>Todo App</h1>

      {/* Error message (if any) */}
      {error && <div className="error">{error}</div>}

      {/* Form to add or edit a task */}
      <TaskForm
        onSubmit={handleAddTask}
        editingTask={editingTask}
        onUpdate={handleUpdateTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      {/* Search and Filter controls */}
      <div className="controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <FilterBar
          currentFilter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* Loading indicator */}
      {loading && <p className="loading">Loading...</p>}

      {/* The actual task list */}
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onEdit={setEditingTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;
