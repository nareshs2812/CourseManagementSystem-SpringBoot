import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginForm = () => {
  const [form, setForm] = useState({ userName: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get('content-type');
      const data = contentType?.includes('application/json') ? await res.json() : await res.text();

      if (!res.ok) {
        throw new Error(data?.error || data || 'Login failed');
      }

      navigate('/courses');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h1>Entry Portal To<br />Your Online World</h1>
        <img src="/loginimage.png" alt="Login Illustration" />
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to your CourseSphere</h2>
          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
              placeholder="Enter your username or email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <button type="button" className="register-btn" onClick={goToRegister}>
            Don’t have an account?
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
