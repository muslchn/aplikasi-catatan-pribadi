import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import AddNotePage from './pages/AddNotePage';
import ArchivedNotesPage from './pages/ArchivedNotesPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';

function ProtectedRoute({ children }) {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const { authUser, initializing, onLogout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (initializing) {
    return (
      <div className="app-container">
        <main>
          <p className="loading-indicator">Memuat aplikasi...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <Link className="app-header__brand" to="/">Catatan Pribadi</Link>
        <div className="app-header__right">
          <button
            className="header-button"
            type="button"
            onClick={toggleTheme}
            aria-label="Ubah tema"
            title="Ubah tema"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          {authUser ? (
            <>
              <nav className="navigation" aria-label="Navigasi utama">
                <ul>
                  <li>
                    <NavLink to="/" end>Aktif</NavLink>
                  </li>
                  <li>
                    <NavLink to="/archives">Arsip</NavLink>
                  </li>
                </ul>
              </nav>
              <div className="user-menu">
                <span>{authUser.name}</span>
                <button type="button" onClick={onLogout}>Keluar</button>
              </div>
            </>
          ) : (
            <nav className="navigation" aria-label="Navigasi autentikasi">
              <ul>
                <li>
                  <NavLink to="/login">Masuk</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Daftar</NavLink>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/archives"
            element={(
              <ProtectedRoute>
                <ArchivedNotesPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/notes/new"
            element={(
              <ProtectedRoute>
                <AddNotePage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/notes/:id"
            element={(
              <ProtectedRoute>
                <NoteDetailPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" replace /> : <RegisterPage />}
          />
          <Route
            path="*"
            element={authUser ? <NotFoundPage /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
