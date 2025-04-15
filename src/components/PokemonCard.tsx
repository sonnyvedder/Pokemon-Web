import { motion } from 'framer-motion';
import { Pokemon } from '../types/pokemon';
import { useRouter } from 'next/navigation';

interface Props {
  pokemon: Pokemon;
  onClick?: () => void;
}

export default function PokemonCard({ pokemon }: Props) {
  const router = useRouter();
  const bgColor = getTypeColor(pokemon.types[0].type.name);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-xl shadow p-3 cursor-pointer relative h-24"
      onClick={() => router.push(`/pokemon/${pokemon.id}`)}
      style={{ 
        backgroundColor: bgColor,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))'
      }}
    >
      <div className="relative">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-white capitalize mb-1">
            {pokemon.name}
          </h2>
          <div className="flex gap-2">
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
        </div>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-16 h-16 sm:w-20 sm:h-20 absolute right-0 bottom-0"
        />
      </div>
    </motion.div>
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