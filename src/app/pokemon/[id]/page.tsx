'use client';
import PokemonDetailClient from '@/components/PokemonDetailClient';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PokemonDetail({ params }: Props) {
  const resolvedParams = await params;
  return <PokemonDetailClient id={resolvedParams.id} />;
}