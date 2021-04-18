import { useQuery, useQueryClient } from 'react-query';

import { Genre, Provider, TVShowSummary } from '../types';
import { fetchTVShows } from '../util/fetch';
import { formatGenres, formatProviders } from '../util/format';
import { prefetchTVShows } from '../util/prefetch';

type useMoviesDef = {
  page: number;
  query: {
    genres: Genre[];
    providers: Provider[];
  };
  initialData: {
    tvShows: TVShowSummary[];
    pageCount: number;
  };
};

const useTVShows = ({ page, query, initialData }: useMoviesDef) => {
  const queryClient = useQueryClient();

  return useQuery(
    [
      '/tv',
      {
        page,
        genres: formatGenres(query.genres),
        providers: formatProviders(query.providers),
      },
    ],
    async () =>
      await fetchTVShows({
        page,
        genres: query.genres,
        providers: query.providers,
      }),
    {
      keepPreviousData: true,
      initialData: {
        tvShows: initialData.tvShows,
        pageCount: initialData.pageCount,
      },
      onSuccess: () => {
        prefetchTVShows(query.genres, query.providers, {
          queryClient,
          page,
          pageCount: initialData.pageCount,
        });
      },
    }
  );
};

export default useTVShows;
