import axios from 'axios';

import { MovieDetails } from '../types';
import {
  parseAgeRating,
  parseCast,
  parseCrew,
  parseGenres,
  parseMovies,
  parseProviders,
  parseRecommendations,
  parseStudio,
  parseTVShows,
} from './parse';
import { SUPPORTED_PROVIDERS } from '../constants';

export const fetchMovies = async () => {
  const { data } = await axios.get('/discover/movie', {
    params: {
      with_watch_providers: SUPPORTED_PROVIDERS.join('|'),
      watch_region: 'US',
    },
  });

  return parseMovies(data.results);
};

export const fetchTVShows = async () => {
  const { data } = await axios.get('/discover/tv', {
    params: {
      with_watch_providers: SUPPORTED_PROVIDERS.join('|'),
      watch_region: 'US',
    },
  });

  return parseTVShows(data.results);
};

export const fetchMovie = async (id: string) => {
  const { data } = await axios.get(`/movie/${id}`, {
    params: {
      append_to_response:
        'release_dates,recommendations,credits,watch/providers',
    },
  });

  const ageRating = parseAgeRating(data.release_dates.results);
  const genres = parseGenres(data.genres);
  const studio = parseStudio(data.production_companies);
  const crew = parseCrew(data.credits.crew);
  const cast = parseCast(data.credits.cast);
  const recommendations = parseRecommendations(data.recommendations.results);
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
    crew,
    cast,
    recommendations,
    providers,
  };

  return movieDetails;
};
