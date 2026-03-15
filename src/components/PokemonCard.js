import React from "react";

// Define type colors for badges
const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div
      className="pokemon-card"
      onClick={onClick}
      style={{ cursor: "pointer", transition: "transform 0.25s ease" }}
    >
      {/* Pokémon Sprite */}
      {pokemon.sprite ? (
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          style={{ width: "80px", height: "80px", marginBottom: "10px" }}
        />
      ) : (
        <p>No image</p>
      )}

      {/* Pokémon Name */}
      <p
        style={{
          fontWeight: "bold",
          textTransform: "capitalize",
          marginBottom: "8px",
        }}
      >
        {pokemon.name || "Unknown"}
      </p>

      {/* Type Badges */}
      <div className="types" style={{ display: "flex", gap: "5px", justifyContent: "center", flexWrap: "wrap" }}>
        {pokemon.types && pokemon.types.length > 0 ? (
          pokemon.types.map((type) => (
            <span
              key={type}
              className="type-badge"
              style={{
                backgroundColor: typeColors[type] || "#888",
                color: "#fff",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "0.7rem",
                textTransform: "capitalize",
              }}
            >
              {type}
            </span>
          ))
        ) : (
          <span
            className="type-badge"
            style={{
              backgroundColor: "#888",
              color: "#fff",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "0.7rem",
            }}
          >
            Loading...
          </span>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;