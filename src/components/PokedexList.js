import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

const PokedexList = ({ searchTerm, filterType, setSelectedPokemon }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Fetch first 151 Pokémon
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!res.ok) throw new Error("Failed to fetch Pokémon list");
        const data = await res.json();

        // Fetch details safely with Promise.all
        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            try {
              const res = await fetch(pokemon.url);
              if (!res.ok) throw new Error();
              const details = await res.json();
              return {
                name: pokemon.name,
                url: pokemon.url,
                sprite: details.sprites.front_default,
                types: details.types.map((t) => t.type.name),
              };
            } catch (err) {
              console.warn(`Skipping ${pokemon.name} due to fetch error`);
              return null;
            }
          })
        );

        // Remove any nulls
        setPokemonList(detailedData.filter((p) => p !== null));
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Loading / error states
  if (loading) return <p className="loading">Loading Pokémon...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  // Filter Pokémon by search term and type
  const filteredPokemon = pokemonList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || p.types.includes(filterType))
  );

  if (filteredPokemon.length === 0)
    return <p className="no-results">No Pokémon found for this search/filter.</p>;

  return (
    <div className="pokedex-list">
      {filteredPokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          onClick={() => setSelectedPokemon(pokemon.url)}
        />
      ))}
    </div>
  );
};

export default PokedexList;