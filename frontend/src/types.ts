// This file defines the shape of our data
// Think of it as a blueprint for what a Task looks like

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

// The filter can be one of these three options
export type FilterStatus = "all" | "completed" | "incomplete";
