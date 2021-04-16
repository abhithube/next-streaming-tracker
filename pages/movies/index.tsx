import { Fragment, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useQuery, useQueryClient } from 'react-query';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';

import MovieCard from '../../components/MovieCard';
import ProvidersFilter from '../../components/ProvidersFilter';
import Pagination from '../../components/Pagination';
import Meta from '../../components/Meta';
import { MovieSummary } from '../../lib/types';
import { fetchMovies } from '../../lib/util/fetch';
import { SUPPORTED_PROVIDERS } from '../../lib/constants';
import { formatProviders } from '../../lib/util/format';

type MoviesPageProps = { movies: MovieSummary[]; pageCount: number };

const MoviesPage = ({ movies, pageCount }: MoviesPageProps) => {
  const [page, setPage] = useState(1);
  const [providers, setProviders] = useState(SUPPORTED_PROVIDERS);

  const queryClient = useQueryClient();

  const { data } = useQuery(
    ['movies', { page, providers: formatProviders(providers) }],
    async () => await fetchMovies({ page: page, providers }),
    { initialData: { movies, pageCount }, keepPreviousData: true }
  );

  useEffect(() => {
    if (page < data!.pageCount) {
      queryClient.prefetchQuery(
        ['movies', { page: page + 1, providers }],
        async () => await fetchMovies({ page: page + 1, providers }),
        { staleTime: Infinity }
      );
    }
  }, [data]);

  return (
    <Container maxW='80%' mt='8' mb='16'>
      <Meta
        title='Movies'
        description='Popular movies currently streaming on Netflix, Hulu, Amazon Prime, Disney+, and HBO Max'
      />
      <Heading as='h1' mb='4'>
        Popular Movies
      </Heading>
      <ProvidersFilter
        providers={providers}
        setProviders={setProviders}
        setPage={setPage}
      />
      <Pagination page={page} pageCount={data!.pageCount} setPage={setPage} />
      <SimpleGrid columns={[1, 2, 4, 5]} spacing={8}>
        {data?.movies.map((movie) => (
          <Fragment key={movie.id}>
            <MovieCard movieSummary={movie} />
          </Fragment>
        ))}
      </SimpleGrid>
      <Pagination page={page} pageCount={data!.pageCount} setPage={setPage} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const props = await fetchMovies({ page: 1 });
  return { props };
};

export default MoviesPage;
