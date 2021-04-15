import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Center, Divider } from '@chakra-ui/react';

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
      <Meta title={movieDetails.title} description={movieDetails.overview} />
      <MovieHeader movieDetails={movieDetails} />
      <Center>
        <Box w='80%'>
          <CastList cast={movieDetails.actors} />
          <Divider borderWidth='2px' borderRadius='xl' />
          <ReviewList reviews={movieDetails.reviews} />
        </Box>
      </Center>
    </Box>
  );
};

export default MoviePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await fetchMovies();

  const paths = movies.map((movie) => {
    return { params: { slug: movie.slug } };
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) return { notFound: true };
  try {
    const movieDetails = await fetchMovie(params.slug.toString().split('-')[0]);

    if (!movieDetails) return { notFound: true };

    return { props: { movieDetails } };
  } catch (err) {
    return { notFound: true };
  }
};
