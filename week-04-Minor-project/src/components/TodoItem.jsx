import React, { useState } from 'react';

// Single To-Do item component demonstrating Props, Conditional Rendering, Destructuring
function TodoItem({ todo, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate);

  // Handle save edit
  const handleSave = () => {
    if (editTitle.trim() === '') {
      alert('Task title cannot be empty!');
      return;
    }
    onEdit(todo.id, editTitle, editDueDate);
    setIsEditing(false);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDueDate(todo.dueDate);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="todo-item">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edit task title"
          />
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
            <button className="btn btn-success btn-sm" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
        />
        <div>
          <div className={`todo-text ${todo.completed ? 'done' : ''}`}>
            {todo.title}
          </div>
          <div className="todo-meta">
            <span className={`badge ${todo.completed ? 'badge-completed' : 'badge-pending'}`}>
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
            {todo.dueDate && (
              <span>Due: {todo.dueDate}</span>
            )}
          </div>
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
