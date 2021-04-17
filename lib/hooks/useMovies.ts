import { useQuery } from 'react-query';

import { Genre, MovieSummary, Provider } from '../types';
import { fetchMovies } from '../util/fetch';
import { formatGenres, formatProviders } from '../util/format';

type useMoviesDef = {
  page: number;
  providers: Provider[];
  genres: Genre[];
  initialData: {
    movies: MovieSummary[];
    pageCount: number;
  };
};

const useMovies = ({ page, providers, genres, initialData }: useMoviesDef) => {
  return useQuery(
    [
      '/movies',
      {
        page,
        genres: formatGenres(genres),
        providers: formatProviders(providers),
      },
    ],
    async () => await fetchMovies({ page, genres, providers }),
    {
      initialData: {
        movies: initialData.movies,
        pageCount: initialData.pageCount,
      },
      keepPreviousData: true,
    }
  );
};

export default useMovies;
