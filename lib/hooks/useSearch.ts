import { useQuery } from 'react-query';

import { search } from '../util/fetch';

const useSearch = (query: string) => {
  return useQuery(['/search', { query }], async () => await search(query), {
    enabled: query.length >= 1,
    staleTime: Infinity,
  });
};

export default useSearch;
