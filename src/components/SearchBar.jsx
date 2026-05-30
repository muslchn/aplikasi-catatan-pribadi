import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ keyword, setKeyword }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Cari catatan berdasarkan judul..."
        aria-label="Cari catatan berdasarkan judul"
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  setKeyword: PropTypes.func.isRequired,
};

export default SearchBar;
