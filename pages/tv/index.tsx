import { Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Fragment, useEffect, useState } from 'react';
import FilterAccordian from '../../components/FilterAccordian';
import Meta from '../../components/Meta';
import Pagination from '../../components/Pagination';
import SummaryCard from '../../components/SummaryCard';
import { SUPPORTED_PROVIDERS } from '../../lib/constants';
import useFetch from '../../lib/hooks/useFetch';
import { ContentSummary, Genre, Provider } from '../../lib/types';
import { fetchAll, fetchGenres } from '../../lib/util/fetch';

type TVShowsPageProps = {
  initTVShows: ContentSummary[];
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

  const [query, setQuery] = useState<QueryDef>({ genres: [], providers: [] });

  const { data, error } = useFetch('tv', {
    page,
    query,
    initialData: { contentList: initTVShows, pageCount: initPageCount },
  });

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [page]);

  if (error)
    return (
      <Text>Our selection of TV shows is not available at this time.</Text>
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
      <FilterAccordian
        genreList={genreList}
        providerList={providerList}
        setPage={setPage}
        setQuery={setQuery}
      />
      {data!.results.length > 0 ? (
        <>
          <Pagination
            page={page}
            pageCount={data!.pageCount}
            setPage={setPage}
          />
          <SimpleGrid columns={[1, 2, 4, 5]} spacing={8}>
            {data!.results.map(tvShow => (
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
        <Text>There are no TV shows matching the selected filters.</Text>
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
      initTVShows: results,
      initPageCount: pageCount,
      genreList,
      providerList: SUPPORTED_PROVIDERS,
    },
    revalidate: 60 * 60 * 24,
  };
};
