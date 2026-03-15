import React from "react";

const SearchBar = ({ searchTerm, onChange }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      placeholder="Search Pokémon..."
      onChange={onChange}
      className="search-bar-input"
    />
  );
};

export default SearchBar;