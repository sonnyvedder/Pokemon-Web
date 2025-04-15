'use client';

import { useState, useEffect } from 'react';
import { getPokemonList } from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard';
import { Pokemon } from '../types/pokemon';

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    try {
      const data = await getPokemonList(20);
      setPokemonList(data);
    } catch (error) {
      console.error('Error loading Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
        <h1 className="text-2xl font-bold mb-6 px-2 text-gray-800">Pokedex</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => console.log('Selected:', pokemon.name)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
