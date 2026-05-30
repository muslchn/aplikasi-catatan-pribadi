import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NotesList({ emptyMessage, notes }) {
  if (notes.length === 0) {
    return (
      <section className="notes-list-empty" aria-live="polite">
        <p>{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </section>
  );
}

NotesList.propTypes = {
  emptyMessage: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  })).isRequired,
};

export default NotesList;
