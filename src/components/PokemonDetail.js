import React, { useState, useEffect } from "react";

// Type colors for badges
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

const PokemonDetail = ({ url }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setDetails(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchDetails();
  }, [url]);

  if (loading) return <p>Loading details...</p>;
  if (!details) return <p>Failed to load Pokémon details.</p>;

  const name = details.name?.toUpperCase() || "Unknown";
  const sprite = details.sprites?.other["official-artwork"]?.front_default || details.sprites?.front_default;
  const types = details.types?.map((t) => t.type.name) || [];
  const stats = details.stats || [];
  const abilities = details.abilities?.map((a) => a.ability.name) || [];

  return (
    <div
      className="pokemon-detail"
      style={{
        textAlign: "center",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {/* Pokémon Name */}
      <h2 style={{ margin: "0", fontSize: "1.5rem" }}>{name}</h2>

      {/* Pokémon Image */}
      {sprite ? (
        <img
          src={sprite}
          alt={name}
          style={{ width: "150px", height: "150px", objectFit: "contain" }}
        />
      ) : (
        <p>No image available</p>
      )}

      {/* Types */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
        {types.length > 0
          ? types.map((type) => (
              <span
                key={type}
                style={{
                  backgroundColor: typeColors[type] || "#888",
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  textTransform: "capitalize",
                }}
              >
                {type}
              </span>
            ))
          : <span>N/A</span>}
      </div>

      {/* Stats */}
      <div style={{ width: "100%" }}>
        <h3 style={{ marginBottom: "6px" }}>Stats</h3>
        {stats.length > 0 ? (
          stats.map((stat) => (
            <div key={stat.stat.name} style={{ marginBottom: "6px" }}>
              <span style={{ fontSize: "0.8rem", textTransform: "capitalize" }}>
                {stat.stat.name}:
              </span>
              <div
                style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "6px",
                  height: "8px",
                  overflow: "hidden",
                  marginTop: "2px",
                }}
              >
                <div
                  style={{
                    width: `${stat.base_stat}%`,
                    background: "#4CAF50",
                    height: "100%",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>N/A</p>
        )}
      </div>

      {/* Abilities */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
        {abilities.length > 0
          ? abilities.map((ability) => (
              <span
                key={ability}
                style={{
                  backgroundColor: "#888",
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  textTransform: "capitalize",
                }}
              >
                {ability}
              </span>
            ))
          : <span>N/A</span>}
      </div>
    </div>
  );
};

export default PokemonDetail;