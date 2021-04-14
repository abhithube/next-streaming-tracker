import { Fragment } from 'react';
import { GetStaticProps } from 'next';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';

import TVShowCard from '../../components/TVShowCard';
import Meta from '../../components/Meta';
import { TVShowSummary } from '../../lib/types';
import { fetchTVShows } from '../../lib/util/fetch';

export type TVShowsPageProps = { tvShows: TVShowSummary[] };

const TVShowsPage = ({ tvShows }: TVShowsPageProps) => {
  return (
    <Container maxW='80%' mt='8' mb='16'>
      <Meta title='TV Shows' />
      <Heading as='h1' mb='4'>
        Popular TV Shows
      </Heading>
      <SimpleGrid columns={[1, 2, 4, 5]} spacing={8}>
        {tvShows.map((tvShow) => (
          <Fragment key={tvShow.id}>
            <TVShowCard tvShowSummary={tvShow} />
          </Fragment>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tvShows = await fetchTVShows();

  return {
    props: { tvShows },
  };
};

export default TVShowsPage;
