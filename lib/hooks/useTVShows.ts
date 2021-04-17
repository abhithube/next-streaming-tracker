import { useQuery } from 'react-query';

import { Genre, TVShowSummary, Provider } from '../types';
import { fetchTVShows } from '../util/fetch';
import { formatGenres, formatProviders } from '../util/format';

type useTVShowsDef = {
  page: number;
  providers: Provider[];
  genres: Genre[];
  initialData: {
    tvShows: TVShowSummary[];
    pageCount: number;
  };
};

const useTVShows = ({
  page,
  providers,
  genres,
  initialData,
}: useTVShowsDef) => {
  return useQuery(
    [
      '/tv',
      {
        page,
        genres: formatGenres(genres),
        providers: formatProviders(providers),
      },
    ],
    async () => await fetchTVShows({ page, genres, providers }),
    {
      initialData: {
        tvShows: initialData.tvShows,
        pageCount: initialData.pageCount,
      },
      keepPreviousData: true,
    }
  );
};

export default useTVShows;
