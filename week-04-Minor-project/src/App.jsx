import React, { useState } from 'react';
import TodoApp from './components/TodoApp';
import NotesApp from './components/NotesApp';

function App() {
  // Active tab state: 'todos' or 'notes'
  const [activeTab, setActiveTab] = useState('todos');

  return (
    <div className="container">
      <header className="app-header">
        <h1>Minor Project 04: React Dashboard</h1>
        <p>A beginner React application combining a To-Do App and a Notes App</p>
      </header>

      {/* Navigation Tabs for switching between apps */}
      <div className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'todos' ? 'active' : ''}`}
          onClick={() => setActiveTab('todos')}
        >
          To-Do App
        </button>
        <button
          className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          Notes App
        </button>
      </div>

      {/* Conditional Rendering of active view */}
      <main>
        {activeTab === 'todos' ? <TodoApp /> : <NotesApp />}
      </main>
    </div>
  );
}

export default App;
