import { Fragment, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import SummaryCard from '../../components/SummaryCard';
import FilterAccordian from '../../components/FilterAccordian';
import Pagination from '../../components/Pagination';
import Meta from '../../components/Meta';
import useFetch from '../../lib/hooks/useFetch';
import { fetchAll, fetchGenres } from '../../lib/util/fetch';
import { ContentSummary, Genre, Provider } from '../../lib/types';
import { SUPPORTED_PROVIDERS } from '../../lib/constants';

type MoviesPageProps = {
  initMovies: ContentSummary[];
  initPageCount: number;
  genreList: Genre[];
  providerList: Provider[];
};

export type QueryDef = {
  genres: Genre[];
  providers: Provider[];
};

const MoviesPage = ({
  initMovies,
  initPageCount,
  genreList,
  providerList,
}: MoviesPageProps) => {
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState<QueryDef>({ genres: [], providers: [] });

  const { data, error } = useFetch('movie', {
    page,
    query,
    initialData: { contentList: initMovies, pageCount: initPageCount },
  });

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [page]);

  if (error)
    return <Text>Our selection of movies is not available at this time.</Text>;

  return (
    <Container maxW='80%' mt='8' pb='32'>
      <Meta
        title='Movies'
        description='Popular movies currently streaming on Netflix, Hulu, Amazon Prime, Disney+, and HBO Max'
      />
      <Heading as='h1' mb='8'>
        Popular Movies
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
            {data!.results.map((movie) => (
              <Fragment key={movie.id}>
                <SummaryCard type='movie' contentSummary={movie} />
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
        <Text>There are no movies matching the selected filters.</Text>
      )}
    </Container>
  );
};

export default MoviesPage;

export const getStaticProps: GetStaticProps = async () => {
  const [{ results, pageCount }, genreList] = await Promise.all([
    fetchAll('movie', { page: 1 }),
    fetchGenres('movie'),
  ]);

  return {
    props: {
      initMovies: results,
      initPageCount: pageCount,
      genreList,
      providerList: SUPPORTED_PROVIDERS,
    },
    revalidate: 60 * 60 * 6,
  };
};
