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
      <Meta title={tvShowDetails.name} />
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
  const shows = await fetchTVShows();

  const paths = shows.map((show) => {
    return { params: { slug: show.slug } };
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) return { notFound: true };
  try {
    const tvShowDetails = await fetchTVShow(
      params.slug.toString().split('-')[0]
    );

    if (!tvShowDetails) return { notFound: true };

    console.log(tvShowDetails);

    return { props: { tvShowDetails } };
  } catch (err) {
    return { notFound: true };
  }
};
