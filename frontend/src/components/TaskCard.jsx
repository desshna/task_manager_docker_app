import './TaskCard.css'

function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  return (
    <article className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-header">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggleComplete}
          />
          <span className="checkmark" />
        </label>
        <h3>{task.title}</h3>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-card-actions">
        <button
          type="button"
          className="btn btn-sm btn-edit"
          onClick={onEdit}
          aria-label="Edit task"
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-sm btn-delete"
          onClick={onDelete}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard
