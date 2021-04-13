import {
  CastMember,
  CrewMember,
  MovieSummary,
  Provider,
  TVShowSummary,
} from '../types';
import { SUPPORTED_PROVIDERS } from '../constants';
import generateSlug from './slugify';

export const parseMovies = (data: any[]): MovieSummary[] => {
  return data.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      slug: generateSlug(movie.id, movie.title),
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    };
  });
};

export const parseTVShows = (data: any[]): TVShowSummary[] => {
  return data.map((show) => {
    return {
      id: show.id,
      name: show.name,
      slug: generateSlug(show.id, show.name),
      posterPath: show.poster_path,
      firstAirDate: show.first_air_date,
      voteAverage: show.vote_average,
    };
  });
};

export const parseAgeRating = (data: any[]): string => {
  const usReleases = data.find(({ iso_3166_1 }) => iso_3166_1 === 'US')
    .release_dates;

  return usReleases[usReleases.length - 1].certification;
};

export const parseCrew = (data: any[]): CrewMember[] => {
  let crew: CrewMember[] = data.reduce((filtered: CrewMember[], person) => {
    if (['Director', 'Screenplay', 'Story', 'Writer'].includes(person.job)) {
      const elem = filtered.find((existing) => existing.id === person.id);
      if (elem) elem.job += `, ${person.job}`;
      else {
        filtered.push({ id: person.id, name: person.name, job: person.job });
      }
    }

    return filtered;
  }, []);

  if (crew.length > 6) crew = crew.slice(0, 6);

  return crew;
};

export const parseCast = (data: any[]): CastMember[] => {
  if (data.length > 20) data = data.slice(0, 20);

  return data.reduce((filtered: CastMember[], person) => {
    if (person.profile_path) {
      filtered.push({
        id: person.id,
        name: person.name,
        character: person.character,
        profilePath: person.profile_path,
      });
    }

    return filtered;
  }, []);
};

export const parseRecommendations = (data: any[]): MovieSummary[] => {
  if (data.length > 5) data = data.slice(0, 5);

  return data.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      slug: generateSlug(movie.id, movie.title),
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    };
  });
};

export const parseProviders = (data: any): Provider[] => {
  if (!data.US.flatrate) return [];

  return data.US.flatrate.reduce((filtered: Provider[], provider) => {
    if (SUPPORTED_PROVIDERS.includes(provider.provider_id)) {
      filtered.push({
        id: provider.provider_id,
        name: provider.provider_name,
        logoPath: provider.logo_path,
      });
    }

    return filtered;
  }, []);
};
