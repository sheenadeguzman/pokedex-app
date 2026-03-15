import React from "react";
import SearchBar from "./SearchBar";
import FilterControls from "./FilterControls";
import PokedexList from "./PokedexList";
import PokemonDetail from "./PokemonDetail";

const MainLayout = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  selectedPokemon,
  setSelectedPokemon,
}) => {
  const closeModal = () => setSelectedPokemon(null);

  return (
    <div className="main-layout">
      <div className="main-content">
        <h1>Pokédex</h1>

        {/* Search & Filter */}
        <div className="controls">
          <SearchBar
            className={`search-bar ${searchTerm ? "active" : ""}`}
            searchTerm={searchTerm}
            onChange={onSearchChange}
          />
          <FilterControls
            className={`filter-controls ${filterType ? "active" : ""}`}
            filterType={filterType}
            onChange={onFilterChange}
          />
        </div>

        {/* Pokedex Grid */}
        <div className="content">
          <PokedexList
            searchTerm={searchTerm}
            filterType={filterType}
            setSelectedPokemon={setSelectedPokemon}
          />
        </div>
      </div>

      {/* Modal Zoom */}
      {selectedPokemon && (
        <div
          className="pokemon-modal active"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="pokedex-device">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <PokemonDetail url={selectedPokemon} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;