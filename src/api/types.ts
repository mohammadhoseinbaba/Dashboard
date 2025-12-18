
export type Role = "BOSS" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "BLOCKED";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  progress: number; // 0..100
  assigneeId: string;
  createdById: string;
  dueDate?: string | null;
  createdAt?: string;
  updatedAt?: string;

  assignee?: Pick<User, "id" | "name" | "email" | "role">;
  createdBy?: Pick<User, "id" | "name" | "email" | "role">;
}

// ---------- Auth DTOs ----------
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

// ---------- Tasks DTOs ----------
export interface CreateTaskRequest {
  title: string;
  description?: string;
  assigneeId: string; // boss assigns to a user
  dueDate?: string;   // ISO string if you want
  priority?: "LOW" | "MEDIUM" | "HIGH"; // optional if your backend supports it
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  progress?: number; // 0..100
  assigneeId?: string;
  dueDate?: string | null;
}

export interface TasksListResponse {
  tasks: Task[];
}

export interface UsersListResponse {
  users: User[];
}

export interface MeResponse {
  user: User;
}
