import { SUPPORTED_PROVIDERS } from '../constants';
import {
  Content,
  ContentSummary,
  Creator,
  Provider,
  SearchResult,
} from '../types';

export const parseAll = (results: any[]): ContentSummary[] => {
  return results.map(result => {
    return {
      id: result.id,
      title: result.title || result.name,
      posterPath: result.poster_path,
      backdropPath: result.backdrop_path,
      releaseDate: result.release_date || result.first_air_date,
      voteAverage: result.vote_average,
    };
  });
};

export const parseSearch = (results: any[]): SearchResult[] => {
  return results.map(result => {
    return {
      id: result.id,
      type: result.media_type,
      title: result.title || result.name,
      posterPath: result.poster_path,
    };
  });
};

export const parseAgeRating = (type: Content, data: any[]): string => {
  const usReleases = data.find(({ iso_3166_1 }) => iso_3166_1 === 'US');
  if (!usReleases) return 'NR';

  if (type === 'movie') {
    const releaseDates = usReleases.release_dates;
    return releaseDates[releaseDates.length - 1].certification || 'NR';
  } else return usReleases.rating || 'NR';
};

export const parseGenres = (data: any[]) => {
  return data.map(({ name }) => name).join(', ');
};

export const parseCreators = (type: Content, data: any[]): Creator[] => {
  if (type === 'movie') {
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

    return creators.sort((a, b) => {
      if (a.job > b.job) return 1;
      else return -1;
    });
  } else {
    return data.map(({ id, name }) => {
      return { id, name, job: 'Creator' };
    });
  }
};

const providers = SUPPORTED_PROVIDERS.map(({ id }) => id);

export const parseProviders = (data: any): Provider[] => {
  if (!data.US?.flatrate) return [];

  return data.US.flatrate.reduce((filtered: Provider[], provider: any) => {
    if (providers.includes(provider.provider_id)) {
      filtered.push({
        id: provider.provider_id,
        name: provider.provider_name,
        logoPath: provider.logo_path,
      });
    }

    return filtered;
  }, []);
};
