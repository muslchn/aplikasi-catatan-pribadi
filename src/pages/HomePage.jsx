import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/network-data';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadNotes() {
      setLoading(true);
      const { error, data } = await getActiveNotes();

      if (!error) {
        setNotes(data);
      }

      setLoading(false);
    }

    loadNotes();
  }, []);

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
      {loading ? (
        <p className="loading-indicator">Memuat catatan...</p>
      ) : (
        <NotesList notes={filteredNotes} emptyMessage="Tidak ada catatan" />
      )}
      <div className="homepage__action">
        <Link className="action" to="/notes/new" aria-label="Tambah catatan" title="Tambah catatan">
          +
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
