'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPokemonDetail } from '@/services/pokemonService';
import { Pokemon } from '@/types/pokemon';

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function PokemonDetail({ params, searchParams }: PageProps) {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await getPokemonDetail(params.id);
      setPokemon(data);
    };
    loadPokemon();
  }, [params.id]);

  if (!pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500" />
      </div>
    );
  }

  const bgColor = getTypeColor(pokemon.types[0].type.name);

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      <div className="relative h-screen">
        {/* Header */}
        <div className="flex justify-between items-center p-4 mb-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.back()}
              className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-white capitalize">{pokemon.name}</h1>
          </div>
          <div className="text-white font-mono">#{String(pokemon.id).padStart(3, '0')}</div>
        </div>

        {/* Type Tags and Pokemon Image Container */}
        <div>
          {/* Type Tags */}
          <div className="flex gap-2 mb-4 px-4">
            {pokemon.types.map((type, index) => (
              <div 
                key={index}
                className="px-3 py-1 rounded-full text-white text-xs font-medium relative overflow-hidden"
              >
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backgroundColor: 'white',
                    opacity: 0.15
                  }}
                />
                <span className="relative z-10">
                  {type.type.name}
                </span>
              </div>
            ))}
          </div>

          {/* Pokemon Image */}
          <div className="flex justify-center mb-4">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-64 h-64"
            />
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-t-3xl absolute bottom-0 left-0 right-0">
          {/* Tabs */}
          <div className="flex border-b px-6 pt-4">
            {['About', 'Base Stats', 'Evolution', 'Moves'].map((tab) => (
              <button
                key={tab}
                className={`pb-4 px-4 font-semibold ${
                  activeTab === tab.toLowerCase().replace(' ', '') 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-y-2">
                  <div className="text-gray-600">Species</div>
                  <div className="col-span-2 capitalize text-gray-800">{pokemon.species?.name?.replace('-', ' ') || 'Seed'}</div>
                  <div className="text-gray-600">Height</div>
                  <div className="col-span-2 text-gray-800">{(pokemon.height * 0.1).toFixed(1)} m</div>
                  <div className="text-gray-600">Weight</div>
                  <div className="col-span-2 text-gray-800">{(pokemon.weight * 0.1).toFixed(1)} kg</div>
                  <div className="text-gray-600">Abilities</div>
                  <div className="col-span-2 capitalize text-gray-800">
                    {pokemon.abilities.map(a => a.ability.name.replace('-', ' ')).join(', ')}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-gray-900 font-semibold mb-2">Breeding</h3>
                  <div className="grid grid-cols-3 gap-y-2">
                    <div className="text-gray-600">Gender</div>
                    <div className="col-span-2 text-gray-800">♂ 87.5% ♀ 12.5%</div>
                    <div className="text-gray-600">Egg Groups</div>
                    <div className="col-span-2 text-gray-800">Monster</div>
                    <div className="text-gray-600">Egg Cycle</div>
                    <div className="col-span-2 text-gray-800">Grass</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'basestats' && (
              <div className="space-y-4">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500 capitalize">{stat.stat.name}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded">
                      <div
                        className="h-full bg-green-500 rounded"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    grass: '#78C850',
    fire: '#FF7B6B',
    water: '#6890F0',
    normal: '#A8A878',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return colors[type] || '#A8A878';
};