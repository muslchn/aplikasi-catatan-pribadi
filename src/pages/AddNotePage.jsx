import React from 'react';
import PropTypes from 'prop-types';
import NoteActionButton from '../components/NoteActionButton';

function AddNotePage({ addNote }) {
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() && !body.trim()) {
      return;
    }

    addNote({
      title: title.trim(),
      body: body.trim(),
    });
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
          <NoteActionButton label="Simpan catatan" type="submit">✓</NoteActionButton>
        </div>
      </form>
    </section>
  );
}

AddNotePage.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default AddNotePage;
