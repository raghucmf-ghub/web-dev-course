import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) {
      alert('Please fill in all fields.');
      return;
    }
    alert(isRegister ? 'Account created! Welcome to ShopZone.' : 'Logged in successfully!');
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>{isRegister ? 'Create Account' : 'Student / User Login'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <div className="form-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="link-btn"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
