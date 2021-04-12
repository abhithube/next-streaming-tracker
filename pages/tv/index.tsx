import { Fragment } from 'react';
import axios from 'axios';
import slugify from 'slugify';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';

import TVShowCard from '../../components/TVShowCard';
import Meta from '../../components/Meta';
import { TVShowSummary } from '../../lib/types/TVShowSummary';

type Props = {
  tvShows: TVShowSummary[];
};

const TVShowsPage = ({ tvShows }: Props) => {
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

export const getStaticProps = async () => {
  const tvShows = await fetchtvShows();

  return {
    props: { tvShows },
  };
};

const fetchtvShows = async (): Promise<TVShowSummary[]> => {
  const { data } = await axios.get('/tv/popular');

  const tvShows = data.results.map((show) => {
    return {
      id: show.id,
      name: show.name,
      slug: `${show.id}-${slugify(show.name, {
        lower: true,
        strict: true,
        locale: 'us',
      })}`,
      posterPath: show.poster_path,
      firstAirDate: show.first_air_date,
      voteAverage: show.vote_average,
    };
  });

  return tvShows;
};

export default TVShowsPage;
