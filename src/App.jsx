import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Pokémon Data using Axios
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
        const promises = response.data.results.map((pokemon) =>
          axios.get(pokemon.url)
        );
        const results = await Promise.all(promises);
        setPokemonData(results.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  // Filter Pokémon based on search query
  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 transition-all duration-500 ease-in-out">
      <h1 className="text-5xl text-center font-extrabold mb-10 text-yellow-400 tracking-wider drop-shadow-2xl animate-pulse">
        Pokémon Gallery
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search Pokémon"
          className="p-3 w-80 rounded-full text-black bg-gray-200 focus:outline-none focus:ring-4 focus:ring-yellow-400 shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 active:ring-yellow-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Pokémon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="text-center col-span-full text-xl text-yellow-300">
            No Pokémon found!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
