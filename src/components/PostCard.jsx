import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();
  const isOwner = user && String(user.id) === String(post.authorId);

  const handleDelete = () => {
    if (window.confirm('Delete this post? This cannot be undone.')) {
      onDelete(post.id);
    }
  };

  return (
    <article
      className="card-glass animate-fade-in-up"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={post.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80';
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        />
        {/* Overlay gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)',
          }}
        />
        {/* Owner badge */}
        {isOwner && (
          <div
            style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
          >
            <span className="tag">YOUR POST</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Title */}
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            lineHeight: '1.4',
            letterSpacing: '-0.01em',
          }}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.description}
        </p>

        {/* Divider */}
        <div className="divider-line" />

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#080c14',
                flexShrink: 0,
              }}
            >
              {post.authorName?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              {post.authorName || 'Unknown'}
            </span>
          </div>

          {/* Actions (only for owner) */}
          {isOwner && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link
                to={`/post/edit/${post.id}`}
                state={{ post }}
                className="btn-ghost"
                style={{ textDecoration: 'none', fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              >
                ✎ Edit
              </Link>
              <button
                className="btn-danger"
                onClick={handleDelete}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              >
                ✕ Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}