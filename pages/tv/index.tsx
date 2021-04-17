import { Fragment, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useQuery, useQueryClient } from 'react-query';
import { Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import TVShowCard from '../../components/TVShowCard';
import ProvidersFilter from '../../components/ProvidersFilter';
import Pagination from '../../components/Pagination';
import Meta from '../../components/Meta';
import { Genre, Provider, TVShowSummary } from '../../lib/types';
import { fetchGenres, fetchTVShows } from '../../lib/util/fetch';
import { SUPPORTED_PROVIDERS } from '../../lib/constants';
import { formatProviders } from '../../lib/util/format';
import useTVShows from '../../lib/hooks/useTVShows';
import usePrefetchTVShows from '../../lib/hooks/usePrefetchTVShows';
import GenresFilter from '../../components/GenresFilter';

type TVShowsPageProps = {
  initTVShows: TVShowSummary[];
  initPageCount: number;
  genreList: Genre[];
  providerList: Provider[];
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

  const { data, error } = useTVShows({
    page,
    genres,
    providers,
    initialData: { tvShows: initTVShows, pageCount: initPageCount },
  });

  usePrefetchTVShows({ page, providers, genres, pageCount: data!.pageCount });

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
      <Heading as='h1' mb='4'>
        Popular TV Shows
      </Heading>
      <GenresFilter
        genreList={genreList}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <ProvidersFilter
        providerList={providerList}
        providers={providers}
        setProviders={setProviders}
        setPage={setPage}
      />
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
