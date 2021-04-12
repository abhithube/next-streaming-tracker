import { Fragment } from 'react';
import axios from 'axios';
import slugify from 'slugify';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';

import MovieCard from '../../components/MovieCard';
import Meta from '../../components/Meta';
import { MovieSummary } from '../../lib/types/MovieSummary';

type Props = {
  movies: MovieSummary[];
};

const MoviesPage = ({ movies }: Props) => {
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

export const getStaticProps = async () => {
  const movies = await fetchMovies();

  return {
    props: { movies },
  };
};

const fetchMovies = async (): Promise<MovieSummary[]> => {
  const { data } = await axios.get('/movie/popular');

  const movies: MovieSummary[] = data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      slug: `${movie.id}-${slugify(movie.title, {
        lower: true,
        strict: true,
        locale: 'us',
      })}`,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    };
  });

  return movies;
};

export default MoviesPage;
