import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import './App.css'

const API_BASE = "https://task-manager-docker-app-2.onrender.com/api/tasks"
function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await fetch(API_BASE)
      if (!res.ok) throw new Error(`Backend error: ${res.status}`)
      const data = await res.json()
      setTasks(data)
      setError(null)
    } catch (err) {
      const msg = err.message.includes('Failed to fetch') || err.message.includes('Load failed')
        ? 'Cannot reach backend. Ensure backend is running on port 8080 and frontend uses npm run dev.'
        : err.message
      setError(msg)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (task) => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, completed: task.completed ?? false }),
      })
      if (!res.ok) {
        const errBody = await res.text()
        throw new Error(errBody || `Failed to create task (${res.status})`)
      }
      const created = await res.json()
      setTasks([created, ...tasks])
      setError(null)
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const updateTask = async (id, task) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      })
      if (!res.ok) throw new Error('Failed to update task')
      const updated = await res.json()
      setTasks(tasks.map((t) => (t.id === id ? updated : t)))
      setEditingTask(null)
      setError(null)
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete task')
      setTasks(tasks.filter((t) => t.id !== id))
      setEditingTask(null)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const toggleComplete = async (task) => {
    await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <main className="app-main">
        <TaskForm
          onSubmit={editingTask ? (t) => updateTask(editingTask.id, t) : createTask}
          initialTask={editingTask}
          onCancel={() => setEditingTask(null)}
          isEdit={!!editingTask}
        />
        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      </main>

      <footer className="app-footer">
        <span>Organize Tasks. Achieve More.</span>
      </footer>
    </div>
  )
}

export default App
