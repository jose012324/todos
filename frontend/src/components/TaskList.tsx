import React from "react";
import { Task } from "../types";

// Props: what this component receives from the parent
interface TaskListProps {
  tasks: Task[]; // The list of tasks to show
  onToggleComplete: (task: Task) => void; // When user clicks the checkbox
  onEdit: (task: Task) => void; // When user clicks "Edit"
  onDelete: (taskId: number) => void; // When user clicks "Delete"
}

function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskListProps) {
  // Show a message if there are no tasks
  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          {/* Checkbox to mark complete/incomplete */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task)}
          />

          {/* Task content */}
          <div className="task-content">
            <h3 className={task.completed ? "strikethrough" : ""}>
              {task.title}
            </h3>
            {task.description && <p>{task.description}</p>}
          </div>

          {/* Action buttons */}
          <div className="task-actions">
            <button className="edit-btn" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
