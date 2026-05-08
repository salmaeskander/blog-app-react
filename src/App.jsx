import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AddEditPost from './pages/Addpost';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

         
          <Route
            path="/post/new"
            element={
              <ProtectedRoute>
                <AddEditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditPost />
              </ProtectedRoute>
            }
          />

      <Route
            path="*"
            element={
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 'calc(100vh - 64px)',
                  gap: '1rem',
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
                  ERROR 404
                </span>
                <h1
                  style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                  }}
                >
                  Page Not Found
                </h1>
                <a
                  href="/"
                  className="btn-primary"
                  style={{ textDecoration: 'none', marginTop: '1rem' }}
                >
                  → Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}