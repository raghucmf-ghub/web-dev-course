import React, { useState } from 'react';

// Single Note card component demonstrating Props and State
function NoteItem({ note, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editCategory, setEditCategory] = useState(note.category);

  // Save changes
  const handleSave = () => {
    if (editTitle.trim() === '' || editContent.trim() === '') {
      alert('Please fill in both title and content!');
      return;
    }
    onEdit(note.id, editTitle, editContent, editCategory);
    setIsEditing(false);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditCategory(note.category);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="note-card">
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edit title"
          />
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Edit note text"
            rows="3"
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button className="btn btn-success btn-sm" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="note-card">
      <div>
        <div className="note-card-header">
          <h3 className="note-title">{note.title}</h3>
          <span className="note-category">{note.category}</span>
        </div>
        <p className="note-content">{note.content}</p>
      </div>

      <div className="note-footer">
        <span className="note-time">{note.timestamp}</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
