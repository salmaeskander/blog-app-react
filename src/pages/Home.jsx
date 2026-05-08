import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../services/Service';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
     
      setPosts(res.data.reverse());
    } catch {
      setError('Failed to load posts. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('Failed to delete post.');
    }
  };

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.7rem',
              color: 'var(--accent-green)',
              letterSpacing: '0.2em',
            }}
          >
            LATEST POSTS
          </span>
        </div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ color: 'var(--text-primary)' }}>The </span>
          <span className="glow-text">Developer</span>
          <br />
          <span style={{ color: 'var(--text-primary)' }}>Blog</span>
        </h1>
        <p
          style={{
            marginTop: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            fontFamily: 'Space Mono, monospace',
            maxWidth: '500px',
          }}
        >
          {user
            ? `Welcome back, ${user.name}. Share your knowledge.`
            : 'Thoughts, stories and ideas from the dev community.'}
        </p>
      </div>

    
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            color: 'var(--text-muted)',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.875rem',
          }}
        >
          <span style={{ color: 'var(--accent-green)' }}>▸</span>&nbsp;Loading posts...
        </div>
      )}

      
      {error && (
        <div
          style={{
            padding: '1rem 1.5rem',
            background: '#ff4d6d10',
            border: '1px solid #ff4d6d30',
            borderRadius: '8px',
            color: '#ff4d6d',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.875rem',
            marginBottom: '2rem',
          }}
        >
          {error}
        </div>
      )}

     
      {!loading && !error && (
        <>
          {posts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.875rem' }}>
                No posts yet.{' '}
                {user ? (
                  <Link to="/post/new" style={{ color: 'var(--accent-green)' }}>
                    Be the first to write one!
                  </Link>
                ) : (
                  <Link to="/auth" style={{ color: 'var(--accent-green)' }}>
                    Login to write one!
                  </Link>
                )}
              </p>
            </div>
          ) : (
            <div
              className="animate-stagger"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}

     
      {user && (
        <Link to="/post/new" className="fab" title="New Post">
          +
        </Link>
      )}
    </main>
  );
}