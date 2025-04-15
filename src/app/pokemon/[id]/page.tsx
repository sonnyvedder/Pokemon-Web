'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPokemonDetail } from '@/services/pokemonService';
import { Pokemon } from '@/types/pokemon';
import PokemonDetailClient from '@/components/PokemonDetailClient';

type Props = {
  params: {
    id: string;
  };
};

export default function PokemonDetail({ params }: { params: { id: string } }) {
  return <PokemonDetailClient id={params.id} />;
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