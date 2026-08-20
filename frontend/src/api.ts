// This file handles all communication with the backend API
// Every function here makes a request to Django and returns the data

import axios from "axios";
import { Task } from "./types";

// Base URL for our Django backend
// "proxy" in package.json forwards this to http://localhost:8000
const API_URL = "/api";

// Get all tasks (with optional search and filter)
export async function fetchTasks(
  search: string = "",
  status: string = ""
): Promise<Task[]> {
  // Build the URL with query parameters
  let url = `${API_URL}/tasks/`;
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }
  if (status && status !== "all") {
    params.append("status", status);
  }

  // If we have params, add them to the URL
  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  const response = await axios.get<Task[]>(url);
  return response.data;
}

// Create a new task
export async function createTask(
  title: string,
  description: string
): Promise<Task> {
  const response = await axios.post<Task>(`${API_URL}/tasks/`, {
    title,
    description,
  });
  return response.data;
}

// Update a task (title, description, or completed status)
export async function updateTask(
  taskId: number,
  data: Partial<Task>
): Promise<Task> {
  const response = await axios.put<Task>(`${API_URL}/tasks/${taskId}/`, data);
  return response.data;
}

// Delete a task
export async function deleteTask(taskId: number): Promise<void> {
  await axios.delete(`${API_URL}/tasks/${taskId}/`);
}
