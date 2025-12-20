import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  IconButton,
  Divider,
  Chip,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { useAuthStore } from "../store/authStore";
import { useTasksQuery, useCreateTask, useUpdateTask, useDeleteTask } from "../hooks/useTasks";
import type { Task, TaskStatus } from "../api/types";

function statusColor(status: TaskStatus): "default" | "warning" | "info" | "success" | "error" {
  switch (status) {
    case "TODO":
      return "default";
    case "IN_PROGRESS":
      return "info";
    case "DONE":
      return "success";
    case "BLOCKED":
      return "error";
    default:
      return "default";
  }
}

export default function TaskPage() {
  const user = useAuthStore((s) => s.user);
  const role = user?.role ?? "GUEST";

  const [title, setTitle] = React.useState("");
  const [localError, setLocalError] = React.useState<string | null>(null);

  const tasksQuery = useTasksQuery();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const tasks = tasksQuery.data?.tasks ?? [];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!user) {
      setLocalError("You must be logged in.");
      return;
    }

    const trimmed = title.trim();
    if (!trimmed) {
      setLocalError("Task title cannot be empty.");
      return;
    }

    // ✅ because CreateTaskRequest requires assigneeId
    createTaskMutation.mutate({
      title: trimmed,
      assigneeId: user.id, // for now: assign to self
    });

    setTitle("");
  };

  const toggleDone = (t: Task) => {
    const nextStatus: TaskStatus = t.status === "DONE" ? "TODO" : "DONE";
    updateTaskMutation.mutate({
      taskId: t.id,
      payload: { status: nextStatus, progress: nextStatus === "DONE" ? 100 : Math.min(t.progress ?? 0, 90) },
    });
  };

  const setProgress = (t: Task, progress: number) => {
    let status: TaskStatus = t.status;

    if (progress === 100) status = "DONE";
    else if (progress === 0) status = "TODO";
    else if (status === "TODO") status = "IN_PROGRESS";

    updateTaskMutation.mutate({
      taskId: t.id,
      payload: { progress, status },
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip label={`Role: ${role}`} />
        {user?.email && <Chip label={user.email} variant="outlined" />}
      </Stack>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Create a task
        </Typography>

        {localError && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {localError}
          </Alert>
        )}

        <Box component="form" onSubmit={onSubmit}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              label="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              disabled={!user || createTaskMutation.isPending}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={!user || createTaskMutation.isPending}
            >
              {createTaskMutation.isPending ? "Adding..." : "Add"}
            </Button>
          </Stack>
        </Box>

        <Alert severity="info" sx={{ mt: 2 }}>
          For now, tasks are assigned to <b>yourself</b> because `assigneeId` is required.
          Next step: Boss can select a user to assign the task.
        </Alert>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Task list
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {tasksQuery.isLoading && <Alert severity="info">Loading tasks...</Alert>}

        {tasksQuery.isError && (
          <Alert severity="error">
            Failed to load tasks: {String((tasksQuery.error as any)?.message ?? tasksQuery.error)}
          </Alert>
        )}

        {!tasksQuery.isLoading && tasks.length === 0 && (
          <Alert severity="warning">No tasks yet. Add one above.</Alert>
        )}

        <Stack spacing={1}>
          {tasks.map((t) => (
            <Paper
              key={t.id}
              variant="outlined"
              sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                  <Chip size="small" label={t.status} color={statusColor(t.status)} />
                  <Typography
                    sx={{
                      textDecoration: t.status === "DONE" ? "line-through" : "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: { xs: 180, sm: 420, md: 650 },
                    }}
                  >
                    {t.title}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={t.status === "DONE" ? <RestartAltIcon /> : <DoneIcon />}
                    onClick={() => toggleDone(t)}
                    disabled={updateTaskMutation.isPending}
                  >
                    {t.status === "DONE" ? "Reopen" : "Done"}
                  </Button>

                  <IconButton onClick={() => deleteTaskMutation.mutate(t.id)} disabled={deleteTaskMutation.isPending}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ flex: 1 }}>
                  <LinearProgress variant="determinate" value={t.progress ?? 0} />
                </Box>
                <Typography variant="body2" sx={{ width: 52, textAlign: "right" }}>
                  {t.progress ?? 0}%
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button size="small" onClick={() => setProgress(t, 0)} variant="text">
                  0%
                </Button>
                <Button size="small" onClick={() => setProgress(t, 50)} variant="text">
                  50%
                </Button>
                <Button size="small" onClick={() => setProgress(t, 100)} variant="text">
                  100%
                </Button>
                {t.assignee?.email && (
                  <Chip size="small" variant="outlined" label={`Assignee: ${t.assignee.email}`} />
                )}
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
