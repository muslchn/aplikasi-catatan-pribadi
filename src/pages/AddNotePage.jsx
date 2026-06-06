import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteActionButton from '../components/NoteActionButton';
import { addNote } from '../utils/network-data';

function AddNotePage() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() && !body.trim()) {
      return;
    }

    setLoading(true);
    const { error } = await addNote({
      title: title.trim(),
      body: body.trim(),
    });
    setLoading(false);

    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className="add-new-page">
      <h1>Tambah Catatan</h1>
      <form className="add-new-page__input" onSubmit={onSubmit}>
        <input
          className="add-new-page__input__title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Judul catatan"
          aria-label="Judul catatan"
          autoFocus
        />
        <div
          className="add-new-page__input__body"
          contentEditable
          data-placeholder="Tuliskan isi catatan..."
          onInput={(event) => setBody(event.currentTarget.innerHTML)}
          role="textbox"
          aria-label="Isi catatan"
          tabIndex={0}
          suppressContentEditableWarning
        />
        <div className="add-new-page__action">
          <NoteActionButton label="Simpan catatan" type="submit" disabled={loading}>
            {loading ? '…' : '✓'}
          </NoteActionButton>
        </div>
      </form>
    </section>
  );
}

export default AddNotePage;
