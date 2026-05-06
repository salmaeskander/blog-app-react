import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createPost, updatePost } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AddEditPost() {
  const { id } = useParams(); // if editing
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isEdit = Boolean(id);
  const existingPost = location.state?.post || null;

  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Populate form if editing
  useEffect(() => {
    if (isEdit && existingPost) {
      setForm({
        title: existingPost.title || '',
        description: existingPost.description || '',
        imageUrl: existingPost.imageUrl || '',
      });
    }
  }, [isEdit, existingPost]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      return setError('Title and description are required.');
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        authorId: user.id,
        authorName: user.name,
      };

      if (isEdit) {
        await updatePost(id, payload);
      } else {
        await createPost(payload);
      }

      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save post. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '3rem 1rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '580px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.65rem',
              color: 'var(--accent-green)',
              letterSpacing: '0.25em',
            }}
          >
            ── {isEdit ? 'EDIT POST' : 'NEW POST'} ──
          </span>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              marginTop: '0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            {isEdit ? 'Edit Your Post' : 'Write Something'}
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.75rem',
              marginTop: '0.5rem',
            }}
          >
            {isEdit
              ? 'Update your post below.'
              : 'Share your ideas with the community.'}
          </p>
        </div>

        {/* Card */}
        <div
          className="card-glass"
          style={{ padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
        >
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Title */}
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
                TITLE *
              </label>
              <input
                className="input-field"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Your post title..."
              />
            </div>

            {/* Description */}
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
                DESCRIPTION *
              </label>
              <textarea
                className="input-field"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write your post content here..."
                rows={6}
                style={{ resize: 'vertical', minHeight: '140px' }}
              />
            </div>

            {/* Image URL */}
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
                IMAGE URL <span style={{ opacity: 0.5 }}>(optional)</span>
              </label>
              <input
                className="input-field"
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              {/* Preview */}
              {form.imageUrl && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: '160px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => navigate(-1)}
                style={{ flex: 1, padding: '0.85rem' }}
              >
                ← Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ flex: 2, padding: '0.85rem' }}
              >
                {loading
                  ? '...'
                  : isEdit
                  ? '→ UPDATE POST'
                  : '→ PUBLISH POST'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}