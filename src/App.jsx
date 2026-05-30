import React from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import AddNotePage from './pages/AddNotePage';
import ArchivedNotesPage from './pages/ArchivedNotesPage';
import HomePage from './pages/HomePage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import {
  addNote,
  archiveNote,
  deleteNote,
  getAllNotes,
  unarchiveNote,
} from './utils/local-data';

function App() {
  const navigate = useNavigate();
  const [notes, setNotes] = React.useState(() => getAllNotes());

  const syncNotes = () => {
    setNotes(getAllNotes());
  };

  const onAddNote = ({ title, body }) => {
    addNote({ title, body });
    syncNotes();
    navigate('/');
  };

  const onDeleteNote = (id) => {
    deleteNote(id);
    syncNotes();
    navigate('/');
  };

  const onToggleArchive = (id, archived) => {
    if (archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }

    syncNotes();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <Link className="app-header__brand" to="/">Catatan Pribadi</Link>
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
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage notes={notes.filter((note) => !note.archived)} />}
          />
          <Route
            path="/archives"
            element={<ArchivedNotesPage notes={notes.filter((note) => note.archived)} />}
          />
          <Route
            path="/notes/new"
            element={<AddNotePage addNote={onAddNote} />}
          />
          <Route
            path="/notes/:id"
            element={(
              <NoteDetailPage
                notes={notes}
                deleteNote={onDeleteNote}
                toggleArchive={onToggleArchive}
              />
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
