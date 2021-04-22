import { Fragment, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import {
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import TVShowCard from '../../components/SummaryCard';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import Meta from '../../components/Meta';
import useFetch from '../../lib/hooks/useFetch';
import { Genre, Provider, ContentSummary } from '../../lib/types';
import { fetchAll, fetchGenres } from '../../lib/util/fetch';
import { SUPPORTED_PROVIDERS } from '../../lib/constants';
import SummaryCard from '../../components/SummaryCard';

type TVShowsPageProps = {
  initResults: ContentSummary[];
  initPageCount: number;
  genreList: Genre[];
  providerList: Provider[];
};

type QueryDef = {
  genres: Genre[];
  providers: Provider[];
};

const TVShowsPage = ({
  initResults,
  initPageCount,
  genreList,
  providerList,
}: TVShowsPageProps) => {
  const [page, setPage] = useState(1);

  const [providers, setProviders] = useState<Provider[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [query, setQuery] = useState<QueryDef>({ genres, providers });

  const { data, error } = useFetch('tv', {
    page,
    query,
    initialData: { contentList: initResults, pageCount: initPageCount },
  });

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [page]);

  if (error)
    return (
      <Text>
        Our selection of TV titles is not available at this time. Try again
        later.
      </Text>
    );

  return (
    <Container maxW='80%' mt='8' pb='32'>
      <Meta
        title='TV Shows'
        description='Popular TV shows currently streaming on Netflix, Hulu, Amazon Prime, Disney+, and HBO Max'
      />
      <Heading as='h1' mb='8'>
        Popular TV Shows
      </Heading>
      <Flex direction='row' mb='4'>
        <Filter
          type='Genres'
          list={genreList}
          selected={genres}
          setSelected={setGenres}
        />
        <Filter
          type='Providers'
          list={providerList}
          selected={providers}
          setSelected={setProviders}
        />
      </Flex>
      <Button
        onClick={() => {
          setQuery({ genres, providers });
          setPage(1);
        }}
        w='100%'
        colorScheme='blue'
      >
        Go!
      </Button>
      {data!.results.length > 0 ? (
        <>
          <Pagination
            page={page}
            pageCount={data!.pageCount}
            setPage={setPage}
          />
          <SimpleGrid columns={[1, 2, 4, 5]} spacing={8}>
            {data!.results.map((tvShow) => (
              <Fragment key={tvShow.id}>
                <SummaryCard type='tv' contentSummary={tvShow} />
              </Fragment>
            ))}
          </SimpleGrid>
          <Pagination
            page={page}
            pageCount={data!.pageCount}
            setPage={setPage}
          />
        </>
      ) : (
        <Text>There are no TV titles matching the selected filters.</Text>
      )}
    </Container>
  );
};

export default TVShowsPage;

export const getStaticProps: GetStaticProps = async () => {
  const [{ results, pageCount }, genreList] = await Promise.all([
    fetchAll('tv', { page: 1 }),
    fetchGenres('tv'),
  ]);

  return {
    props: {
      initResults: results,
      initPageCount: pageCount,
      genreList,
      providerList: SUPPORTED_PROVIDERS,
    },
    revalidate: 60 * 60 * 6,
  };
};
