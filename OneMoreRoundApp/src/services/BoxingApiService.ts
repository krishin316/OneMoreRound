// BoxingApiService.ts
// Service for fetching fighter data from the Boxing Data API

import { RAPIDAPI_HOST, RAPIDAPI_KEY } from '../config/config';

export interface Fighter {
  name: string;
  age: number;
  gender: string | null;
  height: string;
  nationality: string;
  nickname: string | null;
  reach: string;
  stance: string;
  stats: {
    wins: number;
    losses: number;
    draws: number;
    total_bouts: number;
    total_rounds: number;
    ko_percentage: number;
    ko_wins: number;
    stopped: number;
  };
  debut: string;
  id: string;
  division: {
    name: string;
    slug: string;
    weight_lb: number | null;
    weight_kg: number | null;
    id: string;
  };
}

export async function getFighterById(id: string): Promise<Fighter> {
  const url = `https://${RAPIDAPI_HOST}/v1/fighters/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': RAPIDAPI_HOST,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch fighter');
  }
  return await response.json();
}

export async function searchFightersByName(name: string): Promise<Fighter[]> {
  const url = `https://${RAPIDAPI_HOST}/v1/fighters/?name=${encodeURIComponent(name)}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': RAPIDAPI_HOST,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to search fighters');
  }
  return await response.json();
}
