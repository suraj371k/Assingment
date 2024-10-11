import React from "react";

function PokemonCard({ pokemon }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl transform hover:scale-110 hover:shadow-yellow-400 hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-700 cursor-pointer">
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-full h-40 object-contain mb-4 transition-all duration-300 ease-in-out hover:scale-105"
      />
      <h2 className="text-2xl font-semibold text-center capitalize text-yellow-400 drop-shadow-lg animate-pulse">
        {pokemon.name}
      </h2>
      <p className="text-center text-gray-300">ID: {pokemon.id}</p>
    </div>
  );
}

export default PokemonCard;
