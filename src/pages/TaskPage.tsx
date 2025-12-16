import type React from "react"
import { useState } from "react"



export default function TaskPage() {

    type Task = {
        id: number;
        title: string;
        done: boolean;
    }

    const [value, setValue] = useState<string>('')
    const [tasks, setTasks] = useState<Task[]>([])


    const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const trimmed = value.trim()
        if (!trimmed) return

        const newTask: Task = {
            id: Date.now(),
            title: trimmed,
            done: false,
        }

        setTasks((prev) => [newTask, ...prev])

        setValue('')
    }


    const toggleDone = (id: number) => {
        setTasks((prev) =>
            prev.map((t) => t.id === id ? { ...t, done: !t.done } : t))
    }

    const handleDelete = (id: number) => {
        setTasks((prev) => prev.filter((t) => t.id !== id))
    }

    const renderedTask = tasks.map((item) => (
        <div key={item.id}>
            <span>{item.title}</span>
            <input type="checkbox" checked={item.done} onChange={() => toggleDone(item.id)} />
            <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
    ))

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Please Enter your Task:
                    <input type="text" value={value} onChange={handleTaskInput} />
                    <button type="submit">Submit</button>
                </label>
            </form>
            <div>
                {renderedTask}
            </div>
        </>
    )
}