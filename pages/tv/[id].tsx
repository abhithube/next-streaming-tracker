import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Center } from '@chakra-ui/react';

import TVShowHeader from '../../components/TVShowHeader';
import CastList from '../../components/CastList';
import ReviewList from '../../components/ReviewList';
import Meta from '../../components/Meta';
import { TVShowDetails } from '../../lib/types';
import { fetchTVShow, fetchTVShows } from '../../lib/util/fetch';

type TVShowPageProps = { tvShowDetails: TVShowDetails };

const TVShowPage = ({ tvShowDetails }: TVShowPageProps) => {
  return (
    <Box>
      <Meta title={tvShowDetails.name} description={tvShowDetails.overview} />
      <TVShowHeader tvShowDetails={tvShowDetails} />
      <Center>
        <Box w='80%'>
          <CastList cast={tvShowDetails.actors} />
          <ReviewList reviews={tvShowDetails.reviews} />
        </Box>
      </Center>
    </Box>
  );
};

export default TVShowPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { tvShows } = await fetchTVShows({ page: 1 });

  const paths = tvShows.map((show) => {
    return { params: { id: show.id.toString() } };
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const tvShowDetails = await fetchTVShow(params!.id as string);

    if (!tvShowDetails) return { notFound: true };

    return { props: { tvShowDetails } };
  } catch (err) {
    return { notFound: true };
  }
};
