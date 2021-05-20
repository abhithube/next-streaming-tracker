import { Box } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import DetailsHeader from '../../components/DetailsHeader';
import Meta from '../../components/Meta';
import { ContentDetails } from '../../lib/types';
import { fetchAll, fetchOne } from '../../lib/util/fetch';

type TVShowPageProps = { tvShowDetails: ContentDetails };

const TVShowPage = ({ tvShowDetails }: TVShowPageProps) => {
  return (
    <Box>
      <Meta title={tvShowDetails.title} description={tvShowDetails.overview} />
      <DetailsHeader contentDetails={tvShowDetails} />
    </Box>
  );
};

export default TVShowPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchAll('tv', { page: 1 });

  const paths = results.map(({ id }) => {
    return { params: { id: id.toString() } };
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const tvShowDetails = await fetchOne('tv', params!.id as string);

    if (!tvShowDetails) return { notFound: true };

    return { props: { tvShowDetails }, revalidate: 60 * 60 * 24 };
  } catch (err) {
    return { notFound: true };
  }
};
