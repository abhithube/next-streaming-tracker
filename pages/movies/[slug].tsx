import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Center, Flex } from '@chakra-ui/react';

import MovieHeader from '../../components/MovieHeader';
import Meta from '../../components/Meta';
import { MovieDetails } from '../../lib/types';
import { fetchMovie, fetchMovies } from '../../lib/util/fetch';
import CastList from '../../components/CastList';
import ReviewList from '../../components/ReviewList';

type MoviePageProps = { movieDetails: MovieDetails };

const MoviePage = ({ movieDetails }: MoviePageProps) => {
  return (
    <Box>
      <Meta title={movieDetails.title} />
      <MovieHeader movieDetails={movieDetails} />
      <CastList cast={movieDetails.actors} />
      <ReviewList reviews={movieDetails.reviews} />
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || !params.slug) return { notFound: true };
    const movieDetails = await fetchMovie(params.slug.toString().split('-')[0]);

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
