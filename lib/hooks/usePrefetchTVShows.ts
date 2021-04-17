import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { Genre, Provider } from '../types';
import { fetchTVShows } from '../util/fetch';
import { formatGenres, formatProviders } from '../util/format';

type usePrefetchTVShowsDef = {
  page: number;
  providers: Provider[];
  genres: Genre[];
  pageCount: number;
};

const usePrefetchTVShows = ({
  page,
  providers,
  genres,
  pageCount,
}: usePrefetchTVShowsDef) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < pageCount) {
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
    }
  }, [page]);
};

export default usePrefetchTVShows;
