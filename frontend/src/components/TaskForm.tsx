import React, { useState } from "react";
import { Task } from "../types";

// Props: what this component receives from the parent
interface TaskFormProps {
  onSubmit: (title: string, description: string) => void; // For adding new tasks
  editingTask: Task | null; // If we're editing, this is the task being edited
  onUpdate: (taskId: number, title: string, description: string) => void; // For updating
  onCancelEdit: () => void; // To cancel editing
}

function TaskForm({
  onSubmit,
  editingTask,
  onUpdate,
  onCancelEdit,
}: TaskFormProps) {
  // Local state for the form fields
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || ""
  );

  // When editingTask changes, update the form fields
  React.useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Don't reload the page

    // Don't submit if title is empty
    if (!title.trim()) return;

    if (editingTask) {
      // We're updating an existing task
      onUpdate(editingTask.id, title.trim(), description.trim());
    } else {
      // We're adding a new task
      onSubmit(title.trim(), description.trim());
    }

    // Clear the form
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <div className="form-buttons">
        <button type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" className="cancel-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
