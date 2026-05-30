import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import NoteActionButton from '../components/NoteActionButton';
import { showFormattedDate } from '../utils';

function NoteDetailPage({
  notes,
  deleteNote,
  toggleArchive,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find((item) => item.id === id);

  if (!note) {
    return (
      <section className="not-found-page">
        <h1>Catatan tidak ditemukan</h1>
        <p>Catatan yang Anda cari tidak tersedia atau sudah dihapus.</p>
        <Link to="/">Kembali ke catatan aktif</Link>
      </section>
    );
  }

  const onToggleArchive = () => {
    toggleArchive(note.id, note.archived);
    navigate(note.archived ? '/archives' : '/');
  };

  return (
    <article className="detail-page">
      <h1 className="detail-page__title">{note.title}</h1>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">
        {parser(note.body)}
      </div>
      <div className="detail-page__action">
        <NoteActionButton
          className="action--archive"
          label={note.archived ? 'Pindahkan dari arsip' : 'Arsipkan catatan'}
          onClick={onToggleArchive}
        >
          {note.archived ? '↩' : '↓'}
        </NoteActionButton>
        <NoteActionButton
          className="action--delete"
          label="Hapus catatan"
          onClick={() => deleteNote(note.id)}
        >
          ×
        </NoteActionButton>
      </div>
    </article>
  );
}

NoteDetailPage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  })).isRequired,
  deleteNote: PropTypes.func.isRequired,
  toggleArchive: PropTypes.func.isRequired,
};

export default NoteDetailPage;
