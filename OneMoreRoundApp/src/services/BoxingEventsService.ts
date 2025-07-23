// BoxingEventsService.ts
// Service for fetching upcoming boxing events

import { RAPIDAPI_HOST, RAPIDAPI_KEY } from '../config/config';

export interface Broadcaster {
  [country: string]: string;
}

export interface BoxingEvent {
  title: string;
  slug: string;
  date: string;
  location: string;
  status: string;
  scheduled_rounds: number;
  results: any;
  scores: any;
  fighters: {
    fighter_1: {
      full_name?: string;
      name: string;
      fighter_id?: string;
    };
    fighter_2: {
      full_name?: string;
      name: string;
      fighter_id?: string;
    };
  };
  id: string;
  event: {
    title: string;
    slug: string;
    date: string;
    location: string;
    status: string;
    broadcasters: Broadcaster[];
    id: string;
  };
  division: {
    name: string;
    weight_lb: number;
    weight_kg: number;
    id: string;
  };
  titles: Array<{ name: string; id: string }>;
}

export interface EventQuery {
  days?: number;
  date_sort?: 'ASC' | 'DESC';
  page_size?: number;
  page_num?: number;
}

export async function getUpcomingEvents(params: EventQuery = {}): Promise<BoxingEvent[]> {
  const {
    days = 7,
    date_sort = 'DESC',
    page_size = 10,
    page_num = 1,
  } = params;
  const url = `https://${RAPIDAPI_HOST}/v1/fights/schedule?days=${days}&date_sort=${date_sort}&page_size=${page_size}&page_num=${page_num}`;
  const headers = {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': RAPIDAPI_HOST,
  };
  console.log('Fetching events:', { url, headers });
  const response = await fetch(url, {
    method: 'GET',
    headers,
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch events:', response.status, errorText);
    throw new Error(`Failed to fetch events: ${response.status} ${errorText}`);
  }
  const json = await response.json();
  console.log('Events response:', json);
  return Array.isArray(json) ? json : [];
}
