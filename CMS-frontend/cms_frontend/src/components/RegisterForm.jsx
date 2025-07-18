import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterForm.css';

const roleOptions = [
  { label: 'Admin', value: 'ROLE_ADMIN' },
  { label: 'User', value: 'ROLE_USER' }
];

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    roleNames: ['ROLE_USER']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setForm((prev) => ({ ...prev, roleNames: [e.target.value] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const contentType = res.headers.get('content-type');
      const data = contentType?.includes('application/json') ? await res.json() : await res.text();

      if (!res.ok) {
        throw new Error(data?.error || data || 'Registration failed');
      }

      setSuccess(typeof data === 'string' ? data : data.message || 'Registration successful');
      setForm({ name: '', userName: '', email: '', password: '', roleNames: ['ROLE_USER'] });

      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-left">
        <h1>Start Your<br />Learning Journey</h1>
        <img src="/registerimage.png" alt="Register Illustration" />
      </div>

      <div className="register-right">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input type="text" name="userName" value={form.userName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role</label>
            <div className="role-radio-group">
              {roleOptions.map((role) => (
                <label className="role-radio" key={role.value}>
                  <input
                    type="radio"
                    name="roleNames"
                    value={role.value}
                    checked={form.roleNames[0] === role.value}
                    onChange={handleRoleChange}
                  />
                  {role.label}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
