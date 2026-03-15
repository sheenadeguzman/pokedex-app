import React, { useState } from "react";
import MainLayout from "./components/MainLayout";

function App() {
  // Combined state for search and filter
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterType: ""
  });

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Handler for search input
  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  // Handler for filter select
  const handleFilterChange = (value) => {
    setFilters(prev => ({ ...prev, filterType: value }));
  };

  return (
    <MainLayout
      searchTerm={filters.searchTerm}
      filterType={filters.filterType}
      onSearchChange={handleSearchChange}
      onFilterChange={handleFilterChange}
      selectedPokemon={selectedPokemon}
      setSelectedPokemon={setSelectedPokemon}
    />
  );
}

export default App;