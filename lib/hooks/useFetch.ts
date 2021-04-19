import { useQuery, useQueryClient } from 'react-query';

import { Content, Genre, ContentSummary, Provider } from '../types';
import { fetchAll } from '../util/fetch';
import { formatQuery } from '../util/format';
import { prefetch } from '../util/prefetch';

type useFetchDef = {
  page: number;
  query: {
    genres: Genre[];
    providers: Provider[];
  };
  initialData: {
    contentList: ContentSummary[];
    pageCount: number;
  };
};

const useFetch = (type: Content, { page, query, initialData }: useFetchDef) => {
  const queryClient = useQueryClient();

  return useQuery(
    [
      `/${type}`,
      {
        page,
        genres: formatQuery(query.genres),
        providers: formatQuery(query.providers),
      },
    ],
    async () =>
      await fetchAll(type, {
        page,
        genres: query.genres,
        providers: query.providers,
      }),
    {
      keepPreviousData: true,
      initialData: {
        results: initialData.contentList,
        pageCount: initialData.pageCount,
      },
      onSuccess: () => {
        prefetch(type, query.genres, query.providers, {
          queryClient,
          page,
          pageCount: initialData.pageCount,
        });
      },
    }
  );
};

export default useFetch;
