import { http } from "./http";

import type {
  Task,
  TasksListResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
} from "./types";

export async function getTasks(params?: {
  status?: string;
  assigneeId?: string;
  q?: string; // search query
}): Promise<TasksListResponse> {
  const res = await http.get<TasksListResponse>("/tasks", { params });
  return res.data;
}

export async function getTaskById(taskId: string): Promise<{ task: Task }> {
  const res = await http.get<{ task: Task }>(`/tasks/${taskId}`);
  return res.data;
}

export async function createTask(payload: CreateTaskRequest): Promise<{ task: Task }> {
  const res = await http.post<{ task: Task }>("/tasks", payload);
  return res.data;
}

export async function updateTask(
  taskId: string,
  payload: UpdateTaskRequest
): Promise<{ task: Task }> {
  const res = await http.patch<{ task: Task }>(`/tasks/${taskId}`, payload);
  return res.data;
}

export async function deleteTask(taskId: string): Promise<void> {
  await http.delete(`/tasks/${taskId}`);
}
