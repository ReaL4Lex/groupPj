import React from 'react';

const SearchBar = ({ query, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search items..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
