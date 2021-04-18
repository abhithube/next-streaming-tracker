import { useQuery, useQueryClient } from 'react-query';

import { Genre, MovieSummary, Provider } from '../types';
import { fetchMovies } from '../util/fetch';
import { formatGenres, formatProviders } from '../util/format';
import { prefetchMovies } from '../util/prefetch';

type useMoviesDef = {
  page: number;
  query: {
    genres: Genre[];
    providers: Provider[];
  };
  initialData: {
    movies: MovieSummary[];
    pageCount: number;
  };
};

const useMovies = ({ page, query, initialData }: useMoviesDef) => {
  const queryClient = useQueryClient();

  return useQuery(
    [
      '/movies',
      {
        page,
        genres: formatGenres(query.genres),
        providers: formatProviders(query.providers),
      },
    ],
    async () =>
      await fetchMovies({
        page,
        genres: query.genres,
        providers: query.providers,
      }),
    {
      keepPreviousData: true,
      initialData: {
        movies: initialData.movies,
        pageCount: initialData.pageCount,
      },
      onSuccess: () => {
        prefetchMovies(query.genres, query.providers, {
          queryClient,
          page,
          pageCount: initialData.pageCount,
        });
      },
    }
  );
};

export default useMovies;
