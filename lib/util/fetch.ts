import axios from 'axios';

import { Genre, MovieDetails, Provider, TVShowDetails } from '../types';
import {
  parseMovieCertification,
  parseTVShowCertification,
  parseActors,
  parseMovieCreators,
  parseTVShowCreators,
  parseGenres,
  parseMovies,
  parseProviders,
  parseStudio,
  parseTVShows,
  parseReviews,
} from './parse';
import { SUPPORTED_PROVIDERS } from '../constants';

type DiscoverRequest = {
  page: number;
  genres?: Provider[];
  providers?: Provider[];
};

export const fetchMovies = async ({
  page,
  genres,
  providers,
}: DiscoverRequest) => {
  let params: any = {
    page,
    with_watch_providers: SUPPORTED_PROVIDERS,
    watch_region: 'US',
    with_watch_monetization_types: 'flatrate',
  };

  if (genres) params.with_genres = genres.map(({ id }) => id).join(',');
  if (providers) {
    params.with_watch_providers = providers.map(({ id }) => id).join('|');
  }

  const { data } = await axios.get('/discover/movie', { params });

  const pageCount: number = data.total_pages;

  return { movies: parseMovies(data.results), pageCount };
};

export const fetchTVShows = async ({
  page,
  genres,
  providers = SUPPORTED_PROVIDERS,
}: DiscoverRequest) => {
  let params: any = {
    page,
    with_watch_providers: SUPPORTED_PROVIDERS,
    watch_region: 'US',
    with_watch_monetization_types: 'flatrate',
  };

  if (genres) params.with_genres = genres.map(({ id }) => id).join(',');
  if (providers) {
    params.with_watch_providers = providers.map(({ id }) => id).join('|');
  }

  const { data } = await axios.get('/discover/tv', { params });

  const pageCount: number = data.total_pages;

  return { tvShows: parseTVShows(data.results), pageCount };
};

export const fetchMovie = async (id: string) => {
  const { data } = await axios.get(`/movie/${id}`, {
    params: {
      append_to_response: 'release_dates,credits,reviews,watch/providers',
    },
  });

  const ageRating = parseMovieCertification(data.release_dates.results);
  const genres = parseGenres(data.genres);
  const studio = parseStudio(data.production_companies);
  const creators = parseMovieCreators(data.credits.crew);
  const actors = parseActors(data.credits.cast);
  const reviews = parseReviews(data.reviews.results);
  const providers = parseProviders(data['watch/providers'].results);

  const movieDetails: MovieDetails = {
    id: data.id,
    title: data.title,
    posterPath: data.poster_path,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    tagline: data.tagline,
    ageRating,
    runtime: data.runtime,
    genres,
    status: data.status,
    releaseDate: data.release_date,
    budget: data.budget,
    revenue: data.revenue,
    studio,
    creators,
    actors,
    reviews,
    providers,
  };

  return movieDetails;
};

export const fetchTVShow = async (id: string) => {
  const { data } = await axios.get(`/tv/${id}`, {
    params: {
      append_to_response: 'content_ratings,credits,reviews,watch/providers',
    },
  });

  const ageRating = parseTVShowCertification(data.content_ratings.results);
  const genres = parseGenres(data.genres);
  const creators = parseTVShowCreators(data.created_by);
  const actors = parseActors(data.credits.cast);
  const reviews = parseReviews(data.reviews.results);
  const providers = parseProviders(data['watch/providers'].results);

  const tvShowDetails: TVShowDetails = {
    id: data.id,
    name: data.name,
    posterPath: data.poster_path,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    tagline: data.tagline,
    ageRating,
    runtime: data.episode_run_time,
    genres,
    status: data.status,
    firstAirDate: data.first_air_date,
    creators,
    actors,
    reviews,
    providers,
  };

  return tvShowDetails;
};

export const fetchGenres = async (type: 'movie' | 'tv'): Promise<Genre[]> => {
  const { data } = await axios.get(`/genre/${type}/list`);
  return data.genres;
};
