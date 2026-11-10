import React, { useState, useEffect } from 'react';
import NoteItem from './NoteItem';

function NotesApp() {
  // 1. State Management & LocalStorage
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('my_notes_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Error loading notes from local storage:', err);
        return [];
      }
    }
    // Default dummy notes
    return [
      {
        id: 1,
        title: 'React Props and State Notes',
        content: 'Props are read-only passed down from parent components, while state is mutable and managed inside the component.',
        category: 'Study',
        timestamp: '10/11/2026, 10:15 AM'
      },
      {
        id: 2,
        title: 'Project Submission Checklist',
        content: 'Check functional components, useState, useEffect, responsive styles, and push to GitHub repository with README.',
        category: 'Work',
        timestamp: '10/11/2026, 02:30 PM'
      }
    ];
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Study');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 2. useEffect for persistent storage
  useEffect(() => {
    localStorage.setItem('my_notes_data', JSON.stringify(notes));
  }, [notes]);

  // Create new note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      alert('Please fill out both title and content!');
      return;
    }

    // Creating formatted timestamp
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      category: category,
      timestamp: formattedDate
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
    setCategory('Study');
  };

  // Delete note using filter()
  const handleDeleteNote = (id) => {
    const remainingNotes = notes.filter((n) => n.id !== id);
    setNotes(remainingNotes);
  };

  // Edit note using map()
  const handleEditNote = (id, updatedTitle, updatedContent, updatedCategory) => {
    const updated = notes.map((item) => {
      if (item.id === id) {
        const now = new Date();
        const updatedTime = `${now.toLocaleDateString()} at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (edited)`;
        return {
          ...item,
          title: updatedTitle,
          content: updatedContent,
          category: updatedCategory,
          timestamp: updatedTime
        };
      }
      return item;
    });
    setNotes(updated);
  };

  // Filter and search notes using ES6 filter() & find() demonstration
  const filteredNotes = notes.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ? true : item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="card-box">
      <h2 className="card-title">📌 Notes Application</h2>

      {/* Create Note Form */}
      <form onSubmit={handleAddNote} className="form-group">
        <div className="input-row">
          <input
            type="text"
            className="flex-1"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="General">General</option>
          </select>
        </div>
        <textarea
          placeholder="Write your note details here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary">
            + Save Note
          </button>
        </div>
      </form>

      {/* Search and Category Filter Toolbar */}
      <div className="filter-bar">
        <div className="flex-1" style={{ minWidth: '220px' }}>
          <input
            type="text"
            placeholder="🔍 Search notes by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="General">General</option>
          </select>
        </div>
      </div>

      {/* Notes List / Grid */}
      {filteredNotes.length === 0 ? (
        <div className="empty-state">
          No notes found matching your search. Create one above!
        </div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              onEdit={handleEditNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesApp;
