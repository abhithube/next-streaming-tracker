import { QueryClient } from 'react-query';

import { Genre, Provider } from '../types';
import { fetchMovies, fetchTVShows } from './fetch';
import { formatGenres, formatProviders } from './format';

type PrefetchConfig = {
  queryClient: QueryClient;
  page: number;
  pageCount: number;
};

export const prefetchMovies = (
  genres: Genre[],
  providers: Provider[],
  { queryClient, page, pageCount }: PrefetchConfig
) => {
  if (page >= pageCount) return;

  queryClient.prefetchQuery(
    [
      '/movies',
      {
        page: page + 1,
        genres: formatGenres(genres),
        providers: formatProviders(providers),
      },
    ],
    async () => await fetchMovies({ page: page + 1, genres, providers }),
    { staleTime: Infinity }
  );
};

export const prefetchTVShows = (
  genres: Genre[],
  providers: Provider[],
  { queryClient, page, pageCount }: PrefetchConfig
) => {
  if (page >= pageCount) return;

  queryClient.prefetchQuery(
    [
      '/tv',
      {
        page: page + 1,
        genres: formatGenres(genres),
        providers: formatProviders(providers),
      },
    ],
    async () => await fetchTVShows({ page: page + 1, genres, providers }),
    { staleTime: Infinity }
  );
};
