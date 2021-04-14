import { GetStaticPaths, GetStaticProps } from 'next';
import { Box } from '@chakra-ui/react';

import MovieHeader from '../../components/MovieHeader';
import Meta from '../../components/Meta';
import { MovieDetails } from '../../lib/types';
import { fetchMovie, fetchMovies } from '../../lib/util/fetch';

type Props = {
  movieDetails: MovieDetails;
};

const MoviePage = ({ movieDetails }: Props) => {
  return (
    <Box>
      <Meta title={movieDetails.title} />
      <MovieHeader movieDetails={movieDetails} />
    </Box>
  );
};

type Params = {
  params: { slug: string };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  try {
    const movieDetails = await fetchMovie(params.slug.split('-')[0]);

    if (!movieDetails) return { notFound: true };

    return { props: { movieDetails } };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await fetchMovies();

  const paths = movies.map((movie) => {
    return { params: { slug: movie.slug } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export default MoviePage;
