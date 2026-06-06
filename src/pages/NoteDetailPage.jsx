import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import NoteActionButton from '../components/NoteActionButton';
import { showFormattedDate } from '../utils';
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from '../utils/network-data';

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [processing, setProcessing] = React.useState(false);

  React.useEffect(() => {
    async function loadNote() {
      setLoading(true);
      const { error, data } = await getNote(id);

      if (!error) {
        setNote(data);
      }

      setLoading(false);
    }

    loadNote();
  }, [id]);

  if (loading) {
    return <p className="loading-indicator">Memuat detail catatan...</p>;
  }

  if (!note) {
    return (
      <section className="not-found-page">
        <h1>Catatan tidak ditemukan</h1>
        <p>Catatan yang Anda cari tidak tersedia atau sudah dihapus.</p>
        <Link to="/">Kembali ke catatan aktif</Link>
      </section>
    );
  }

  const onToggleArchive = async () => {
    setProcessing(true);
    const { error } = note.archived
      ? await unarchiveNote(note.id)
      : await archiveNote(note.id);
    setProcessing(false);

    if (!error) {
      navigate(note.archived ? '/' : '/archives');
    }
  };

  const onDeleteNote = async () => {
    setProcessing(true);
    const { error } = await deleteNote(note.id);
    setProcessing(false);

    if (!error) {
      navigate('/');
    }
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
          disabled={processing}
        >
          {note.archived ? '↩' : '↓'}
        </NoteActionButton>
        <NoteActionButton
          className="action--delete"
          label="Hapus catatan"
          onClick={onDeleteNote}
          disabled={processing}
        >
          ×
        </NoteActionButton>
      </div>
    </article>
  );
}

export default NoteDetailPage;
