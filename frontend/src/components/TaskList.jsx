import TaskCard from './TaskCard'
import './TaskList.css'

function TaskList({ tasks, loading, onEdit, onDelete, onToggleComplete }) {
  if (loading) {
    return (
      <section className="task-list-section">
        <h2>Tasks</h2>
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading tasks...</p>
        </div>
      </section>
    )
  }

  if (tasks.length === 0) {
    return (
      <section className="task-list-section">
        <h2>Tasks</h2>
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <p>No tasks yet</p>
          <span className="empty-hint">Add your first task above</span>
        </div>
      </section>
    )
  }

  return (
    <section className="task-list-section">
      <h2>Tasks <span className="task-count">{tasks.length}</span></h2>
      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
            onToggleComplete={() => onToggleComplete(task)}
          />
        ))}
      </div>
    </section>
  )
}

export default TaskList
