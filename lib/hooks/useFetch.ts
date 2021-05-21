import { useQuery, useQueryClient } from 'react-query';
import { Content } from '../types';
import { fetchAll } from '../util/fetch';

type useFetchOptionsDef = {
  page: number;
  genres: string;
  providers: string;
};

const useFetch = (
  type: Content,
  { page, genres, providers }: useFetchOptionsDef
) => {
  const queryClient = useQueryClient();

  return useQuery(
    [
      type,
      {
        page,
        genres,
        providers,
      },
    ],
    () =>
      fetchAll(type, {
        page,
        genres,
        providers,
      }),
    {
      onSuccess: data => {
        if (page >= data.pageCount) return;

        queryClient.prefetchQuery(
          [
            type,
            {
              page: page + 1,
              genres,
              providers,
            },
          ],
          () =>
            fetchAll(type, {
              page: page + 1,
              genres,
              providers,
            })
        );
      },
    }
  );
};

export default useFetch;
