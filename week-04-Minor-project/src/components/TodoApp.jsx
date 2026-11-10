import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoApp() {
  // 1. State management using useState and LocalStorage integration
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('my_todos_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Error loading todos from local storage:', err);
        return [];
      }
    }
    // Default initial tasks for demo
    return [
      { id: 1, title: 'Learn React Hooks (useState & useEffect)', completed: true, dueDate: '2026-11-10' },
      { id: 2, title: 'Complete Week 04 Minor Project', completed: false, dueDate: '2026-11-15' },
      { id: 3, title: 'Push code to GitHub repository', completed: false, dueDate: '2026-11-16' }
    ];
  });

  const [inputTitle, setInputTitle] = useState('');
  const [inputDueDate, setInputDueDate] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Completed', 'Pending'

  // 2. Side effects using useEffect: Sync todos to LocalStorage
  useEffect(() => {
    localStorage.setItem('my_todos_data', JSON.stringify(todos));
  }, [todos]);

  // Add new task
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputTitle.trim() === '') {
      alert('Please enter a task name!');
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: inputTitle.trim(),
      completed: false,
      dueDate: inputDueDate || ''
    };

    // Using spread operator
    setTodos([newTodo, ...todos]);
    setInputTitle('');
    setInputDueDate('');
  };

  // Toggle completed status using map()
  const handleToggleComplete = (id) => {
    const updated = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(updated);
  };

  // Delete task using filter()
  const handleDeleteTodo = (id) => {
    const remaining = todos.filter((item) => item.id !== id);
    setTodos(remaining);
  };

  // Edit existing task using map()
  const handleEditTodo = (id, newTitle, newDueDate) => {
    const updated = todos.map((item) => {
      if (item.id === id) {
        return { ...item, title: newTitle, dueDate: newDueDate };
      }
      return item;
    });
    setTodos(updated);
  };

  // Task filtering logic
  const filteredTodos = todos.filter((item) => {
    if (filter === 'Completed') return item.completed === true;
    if (filter === 'Pending') return item.completed === false;
    return true; // 'All'
  });

  return (
    <div className="card-box">
      <h2 className="card-title">📝 To-Do List Application</h2>

      {/* Add Task Form */}
      <form onSubmit={handleAddTodo} className="form-group">
        <div className="input-row">
          <input
            type="text"
            className="flex-1"
            placeholder="What needs to be done?"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          <input
            type="date"
            value={inputDueDate}
            onChange={(e) => setInputDueDate(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            + Add Task
          </button>
        </div>
      </form>

      {/* Filter and Stats Bar */}
      <div className="filter-bar">
        <div>
          <span>Total: <strong>{todos.length}</strong> tasks | </span>
          <span>Done: <strong>{todos.filter(t => t.completed).length}</strong></span>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'Pending' ? 'active' : ''}`}
            onClick={() => setFilter('Pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'Completed' ? 'active' : ''}`}
            onClick={() => setFilter('Completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Task List Rendering with .map() */}
      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          No tasks found under "{filter}". Add one above!
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoApp;
