import { Fragment, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useQuery, useQueryClient } from 'react-query';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';

import MovieCard from '../../components/MovieCard';
import Meta from '../../components/Meta';
import { MovieSummary } from '../../lib/types';
import { fetchMovies } from '../../lib/util/fetch';
import Pagination from '../../components/Pagination';

type MoviesPageProps = { movies: MovieSummary[]; pageCount: number };

const MoviesPage = ({ movies, pageCount }: MoviesPageProps) => {
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const { data } = useQuery(
    ['movies', { page }],
    async () => await fetchMovies({ page }),
    { initialData: { movies, pageCount }, keepPreviousData: true }
  );

  useEffect(() => {
    if (
      page < data!.pageCount &&
      !queryClient.getQueryData(['movies', { page: page + 1 }])
    ) {
      queryClient.prefetchQuery(
        ['movies', { page: page + 1 }],
        async () => await fetchMovies({ page: page + 1 })
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
