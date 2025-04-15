import axios from 'axios';
import { Pokemon } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit: number = 20, offset: number = 0) => {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const results = response.data.results;

  const pokemonList = await Promise.all(
    results.map(async (pokemon: { url: string }) => {
      const detail = await axios.get(pokemon.url);
      return detail.data;
    })
  );

  return pokemonList;
};

export const getPokemonDetail = async (id: string): Promise<Pokemon> => {
  const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
  return response.data;
};