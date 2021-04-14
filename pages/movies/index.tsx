import { Fragment } from 'react';
import { GetStaticProps } from 'next';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';

import MovieCard from '../../components/MovieCard';
import Meta from '../../components/Meta';
import { MovieSummary } from '../../lib/types';
import { fetchMovies } from '../../lib/util/fetch';

type MoviesPageProps = { movies: MovieSummary[] };

const MoviesPage = ({ movies }: MoviesPageProps) => {
  return (
    <Container maxW='80%' mt='8' mb='16'>
      <Meta title='Movies' />
      <Heading as='h1' mb='4'>
        Popular Movies
      </Heading>
      <SimpleGrid columns={[1, 2, 4, 5]} spacing={8}>
        {movies.map((movie) => (
          <Fragment key={movie.id}>
            <MovieCard movieSummary={movie} />
          </Fragment>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const movies = await fetchMovies();

  return {
    props: { movies },
  };
};

export default MoviesPage;
