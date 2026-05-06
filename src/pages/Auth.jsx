import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Already logged in → redirect home
  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (tab === 'register') {
      if (!form.name.trim()) return setError('Name is required.');
      if (form.password !== form.confirmPassword)
        return setError('Passwords do not match.');
    }

    if (!form.email.trim() || !form.password.trim())
      return setError('Email and password are required.');

    setLoading(true);
    try {
      if (tab === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data || 'Something went wrong. Try again.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (newTab) => {
    setTab(newTab);
    setError('');
    setForm({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <main
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.65rem',
              color: 'var(--accent-green)',
              letterSpacing: '0.25em',
            }}
          >
            ── ACCESS PORTAL ──
          </span>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              marginTop: '0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            {tab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.75rem',
              marginTop: '0.5rem',
            }}
          >
            {tab === 'login'
              ? 'Sign in to manage your posts'
              : 'Join the developer community'}
          </p>
        </div>

        {/* Card */}
        <div
          className="card-glass"
          style={{ padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
        >
          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              padding: '4px',
              marginBottom: '1.75rem',
              gap: '4px',
            }}
          >
            {['login', 'register'].map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  border: 'none',
                  borderRadius: '6px',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background:
                    tab === t
                      ? 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))'
                      : 'transparent',
                  color: tab === t ? '#080c14' : 'var(--text-muted)',
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: '0.75rem 1rem',
                background: '#ff4d6d10',
                border: '1px solid #ff4d6d30',
                borderRadius: '8px',
                color: '#ff4d6d',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.75rem',
                marginBottom: '1.25rem',
              }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tab === 'register' && (
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.15em',
                    marginBottom: '0.4rem',
                  }}
                >
                  NAME
                </label>
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.15em',
                  marginBottom: '0.4rem',
                }}
              >
                EMAIL
              </label>
              <input
                className="input-field"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.15em',
                  marginBottom: '0.4rem',
                }}
              >
                PASSWORD
              </label>
              <input
                className="input-field"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
              />
            </div>

            {tab === 'register' && (
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.15em',
                    marginBottom: '0.4rem',
                  }}
                >
                  CONFIRM PASSWORD
                </label>
                <input
                  className="input-field"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                />
              </div>
            )}

            <button
              className="btn-primary"
              type="submit"
              disabled={loading}
              style={{ marginTop: '0.5rem', width: '100%', padding: '0.85rem' }}
            >
              {loading
                ? '...'
                : tab === 'login'
                ? '→ LOGIN'
                : '→ CREATE ACCOUNT'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}