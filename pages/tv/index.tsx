import { Fragment, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useQuery, useQueryClient } from 'react-query';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';

import TVShowCard from '../../components/TVShowCard';
import ProvidersFilter from '../../components/ProvidersFilter';
import Pagination from '../../components/Pagination';
import Meta from '../../components/Meta';
import { TVShowSummary } from '../../lib/types';
import { fetchTVShows } from '../../lib/util/fetch';
import { SUPPORTED_PROVIDERS } from '../../lib/constants';
import { formatProviders } from '../../lib/util/format';

type TVShowsPageProps = { tvShows: TVShowSummary[]; pageCount: number };

const TVShowsPage = ({ tvShows, pageCount }: TVShowsPageProps) => {
  const [page, setPage] = useState(1);
  const [providers, setProviders] = useState(SUPPORTED_PROVIDERS);

  const queryClient = useQueryClient();

  const { data } = useQuery(
    ['movies', { page, providers: formatProviders(providers) }],
    async () => await fetchTVShows({ page: page, providers }),
    { initialData: { tvShows, pageCount }, keepPreviousData: true }
  );

  useEffect(() => {
    if (page < data!.pageCount) {
      queryClient.prefetchQuery(
        ['movies', { page: page + 1, providers }],
        async () => await fetchTVShows({ page: page + 1, providers }),
        { staleTime: Infinity }
      );
    }
  }, [data]);

  return (
    <Container maxW='80%' mt='8' mb='16'>
      <Meta
        title='TV Shows'
        description='Popular TV shows currently streaming on Netflix, Hulu, Amazon Prime, Disney+, and HBO Max'
      />
      <Heading as='h1' mb='4'>
        Popular TV Shows
      </Heading>
      <ProvidersFilter
        providers={providers}
        setProviders={setProviders}
        setPage={setPage}
      />
      <Pagination page={page} pageCount={data!.pageCount} setPage={setPage} />

      <SimpleGrid columns={[1, 2, 4, 5]} spacing={8}>
        {data!.tvShows.map((tvShow) => (
          <Fragment key={tvShow.id}>
            <TVShowCard tvShowSummary={tvShow} />
          </Fragment>
        ))}
      </SimpleGrid>
      <Pagination page={page} pageCount={data!.pageCount} setPage={setPage} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const props = await fetchTVShows({ page: 1 });
  return { props };
};

export default TVShowsPage;
