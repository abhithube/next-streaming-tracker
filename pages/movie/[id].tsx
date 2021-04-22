import { GetStaticPaths, GetStaticProps } from 'next';
import { Box } from '@chakra-ui/react';

import DetailsHeader from '../../components/DetailsHeader';
import Meta from '../../components/Meta';
import { ContentDetails } from '../../lib/types';
import { fetchAll, fetchOne } from '../../lib/util/fetch';

type MoviePageProps = { movieDetails: ContentDetails };

const MoviePage = ({ movieDetails }: MoviePageProps) => {
  return (
    <Box>
      <Meta title={movieDetails.title} description={movieDetails.overview} />
      <DetailsHeader contentDetails={movieDetails} />
    </Box>
  );
};

export default MoviePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchAll('movie', { page: 1 });

  const paths = results.map(({ id }) => {
    return { params: { id: id.toString() } };
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const movieDetails = await fetchOne('movie', params!.id as string);

    if (!movieDetails) return { notFound: true };

    return { props: { movieDetails }, revalidate: 60 * 60 * 6 };
  } catch (err) {
    return { notFound: true };
  }
};
