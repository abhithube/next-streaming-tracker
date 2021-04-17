import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { Genre, Provider } from '../types';
import { fetchMovies } from '../util/fetch';
import { formatGenres, formatProviders } from '../util/format';

type usePrefetchMoviesDef = {
  page: number;
  providers: Provider[];
  genres: Genre[];
  pageCount: number;
};

const usePrefetchMovies = ({
  page,
  providers,
  genres,
  pageCount,
}: usePrefetchMoviesDef) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < pageCount) {
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
    }
  }, [page]);
};

export default usePrefetchMovies;
