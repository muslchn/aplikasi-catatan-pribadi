import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';

function HomePage({ notes }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const setKeyword = (nextKeyword) => {
    const trimmedKeyword = nextKeyword.trimStart();

    if (trimmedKeyword) {
      setSearchParams({ keyword: trimmedKeyword });
    } else {
      setSearchParams({});
    }
  };

  const filteredNotes = notes.filter((note) => (
    note.title.toLowerCase().includes(keyword.toLowerCase())
  ));

  return (
    <section className="notes-page">
      <div className="page-heading">
        <h1>Catatan Aktif</h1>
      </div>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <NotesList notes={filteredNotes} emptyMessage="Tidak ada catatan" />
      <div className="homepage__action">
        <Link className="action" to="/notes/new" aria-label="Tambah catatan" title="Tambah catatan">
          +
        </Link>
      </div>
    </section>
  );
}

HomePage.propTypes = {
  notes: NotesList.propTypes.notes,
};

export default HomePage;
