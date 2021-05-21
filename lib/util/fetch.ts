import axios from 'axios';
import { Content, ContentDetails, Genre } from '../types';
import {
  parseAgeRating,
  parseAll,
  parseCreators,
  parseGenres,
  parseProviders,
  parseSearch,
} from './parse';

type DiscoverRequest = {
  page: number;
  genres?: string;
  providers?: string;
};

export const fetchAll = async (
  type: Content,
  { page, genres, providers }: DiscoverRequest
) => {
  let params: any = { page };

  if (genres) params.with_genres = genres;
  if (providers) {
    params.with_watch_providers = providers;
    params.watch_region = 'US';
    params.with_watch_monetization_types = 'flatrate';
  }

  const { data } = await axios.get(`/discover/${type}`, { params });

  const pageCount: number = data.total_pages;

  return { results: parseAll(data.results), pageCount };
};

export const fetchOne = async (type: Content, id: string) => {
  const { data } = await axios.get(`/${type}/${id}`, {
    params: {
      append_to_response:
        'release_dates,content_ratings,credits,reviews,watch/providers',
    },
  });

  const contentDetails: ContentDetails = {
    id: data.id,
    title: data.title || data.name,
    posterPath: data.poster_path,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    tagline: data.tagline,
    ageRating: parseAgeRating(
      type,
      data.release_dates?.results || data.content_ratings?.results
    ),
    runtime:
      data.runtime ||
      (data.episode_run_time && data.episode_run_time[0]) ||
      null,
    genres: parseGenres(data.genres),
    releaseDate: data.release_date || data.first_air_date || null,
    creators: parseCreators(type, data.created_by || data.credits.crew),
    providers: parseProviders(data['watch/providers'].results),
  };

  return contentDetails;
};

export const search = async (query: string) => {
  const { data } = await axios.get('/search/multi', {
    params: { query },
  });

  const results: any[] = [];
  data.results
    .filter((result: any) => result.poster_path !== null)
    .forEach((result: any) => {
      if (['movie', 'tv'].includes(result.media_type)) results.push(result);
    });

  return parseSearch(results);
};

export const fetchGenres = async (type: Content): Promise<Genre[]> => {
  const { data } = await axios.get(`/genre/${type}/list`);
  return data.genres;
};
