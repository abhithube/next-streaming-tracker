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

import TVShowCard from '../../components/TVShowCard';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import Meta from '../../components/Meta';
import useTVShows from '../../lib/hooks/useTVShows';
import { Genre, Provider, TVShowSummary } from '../../lib/types';
import { fetchGenres, fetchTVShows } from '../../lib/util/fetch';
import { SUPPORTED_PROVIDERS } from '../../lib/constants';

type TVShowsPageProps = {
  initTVShows: TVShowSummary[];
  initPageCount: number;
  genreList: Genre[];
  providerList: Provider[];
};

type QueryDef = {
  genres: Genre[];
  providers: Provider[];
};

const TVShowsPage = ({
  initTVShows,
  initPageCount,
  genreList,
  providerList,
}: TVShowsPageProps) => {
  const [page, setPage] = useState(1);

  const [providers, setProviders] = useState<Provider[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [query, setQuery] = useState<QueryDef>({ genres, providers });

  const { data, error } = useTVShows({
    page,
    query,
    initialData: { tvShows: initTVShows, pageCount: initPageCount },
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
    <Container maxW='80%' mt='8' mb='16'>
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
      {data!.tvShows.length > 0 ? (
        <>
          <Pagination
            page={page}
            pageCount={data!.pageCount}
            setPage={setPage}
          />
          <SimpleGrid columns={[1, 2, 4, 5]} spacing={8}>
            {data!.tvShows.map((tvShow) => (
              <Fragment key={tvShow.id}>
                <TVShowCard tvShowSummary={tvShow} />
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
  const [{ tvShows, pageCount }, genreList] = await Promise.all([
    fetchTVShows({ page: 1 }),
    fetchGenres('tv'),
  ]);

  return {
    props: {
      initTVShows: tvShows,
      initPageCount: pageCount,
      genreList,
      providerList: SUPPORTED_PROVIDERS,
    },
  };
};
