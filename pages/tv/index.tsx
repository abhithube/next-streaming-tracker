import { Fragment, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useQuery, useQueryClient } from 'react-query';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';

import TVShowCard from '../../components/TVShowCard';
import Meta from '../../components/Meta';
import { TVShowSummary } from '../../lib/types';
import { fetchTVShows } from '../../lib/util/fetch';
import Pagination from '../../components/Pagination';

type TVShowsPageProps = { tvShows: TVShowSummary[]; pageCount: number };

const TVShowsPage = ({ tvShows, pageCount }: TVShowsPageProps) => {
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const { data } = useQuery(
    ['tv', { page }],
    async () => await fetchTVShows({ page }),
    { initialData: { tvShows, pageCount }, keepPreviousData: true }
  );

  useEffect(() => {
    if (
      page < data!.pageCount &&
      !queryClient.getQueryData(['tv', { page: page + 1 }])
    ) {
      queryClient.prefetchQuery(
        ['tv', { page: page + 1 }],
        async () => await fetchTVShows({ page: page + 1 })
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
