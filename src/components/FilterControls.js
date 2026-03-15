import React from "react";

const FilterControls = ({ filterType, onChange }) => {
  return (
    <select value={filterType} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Types</option>
      <option value="fire">Fire</option>
      <option value="water">Water</option>
      <option value="grass">Grass</option>
      <option value="electric">Electric</option>
      <option value="psychic">Psychic</option>
      {/* Add more types as needed */}
    </select>
  );
};

export default FilterControls;