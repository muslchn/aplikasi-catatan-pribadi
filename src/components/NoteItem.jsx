import React from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils';

function NoteItem({
  id,
  title,
  body,
  createdAt,
}) {
  return (
    <article className="note-item">
      <h2 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h2>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="note-item__body">
        {parser(body)}
      </div>
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
