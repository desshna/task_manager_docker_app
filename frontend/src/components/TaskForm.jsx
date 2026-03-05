import { useState, useEffect } from 'react'
import './TaskForm.css'

function TaskForm({ onSubmit, initialTask, onCancel, isEdit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title)
      setDescription(initialTask.description || '')
      setCompleted(initialTask.completed || false)
    } else {
      setTitle('')
      setDescription('')
      setCompleted(false)
    }
  }, [initialTask])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitting(true)
    const success = await onSubmit({ title: title.trim(), description: description.trim(), completed })
    setSubmitting(false)
    if (success && !isEdit) {
      setTitle('')
      setDescription('')
      setCompleted(false)
    }
  }

  return (
    <section className="task-form-section">
      <h2>{isEdit ? 'Edit Task' : 'New Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            maxLength={200}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
            rows={3}
            maxLength={1000}
          />
        </div>
        {isEdit && (
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              Completed
            </label>
          </div>
        )}
        <div className="form-actions">
          {isEdit && (
            <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Update' : 'Add Task'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm
