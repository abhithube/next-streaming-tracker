import {
  Actor,
  Creator,
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

export const parseGenres = (data: any[]) => {
  return data.map(({ name }) => name).join(', ');
};

export const parseStudio = (data: any[]): string => {
  if (data.length > 0) return data[0].name;
  else return '';
};

export const parseCreators = (data: any[]): Creator[] => {
  let creators: Creator[] = data.reduce((filtered: Creator[], creator) => {
    if (['Director', 'Screenplay', 'Story', 'Writer'].includes(creator.job)) {
      const elem = filtered.find(({ id }) => id === creator.id);
      if (elem) elem.job += `, ${creator.job}`;
      else {
        const { id, name, job } = creator;
        filtered.push({ id, name, job });
      }
    }

    return filtered;
  }, []);

  if (creators.length > 6) creators = creators.slice(0, 6);

  return creators;
};

export const parseActors = (data: any[]): Actor[] => {
  if (data.length > 20) data = data.slice(0, 20);

  return data.reduce((filtered: Actor[], actor) => {
    if (actor.profile_path) {
      const { id, name, character } = actor;
      filtered.push({
        id,
        name,
        character,
        profilePath: actor.profile_path,
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

  return data.US.flatrate.reduce((filtered: Provider[], provider: any) => {
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
