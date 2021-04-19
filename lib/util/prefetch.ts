import { QueryClient } from 'react-query';

import { Content, Genre, Provider } from '../types';
import { fetchAll } from './fetch';
import { formatQuery } from './format';

type PrefetchConfig = {
  queryClient: QueryClient;
  page: number;
  pageCount: number;
};

export const prefetch = (
  type: Content,
  genres: Genre[],
  providers: Provider[],
  { queryClient, page, pageCount }: PrefetchConfig
) => {
  if (page >= pageCount) return;

  queryClient.prefetchQuery(
    [
      `/${type}`,
      {
        page: page + 1,
        genres: formatQuery(genres),
        providers: formatQuery(providers),
      },
    ],
    async () => await fetchAll(type, { page: page + 1, genres, providers }),
    { staleTime: Infinity }
  );
};
