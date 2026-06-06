import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/network-data';

function ArchivedNotesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadNotes() {
      setLoading(true);
      const { error, data } = await getArchivedNotes();

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
        <h1>Catatan Arsip</h1>
      </div>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      {loading ? (
        <p className="loading-indicator">Memuat arsip...</p>
      ) : (
        <NotesList notes={filteredNotes} emptyMessage="Arsip kosong" />
      )}
    </section>
  );
}

export default ArchivedNotesPage;
