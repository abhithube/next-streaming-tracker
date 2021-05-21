import { Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Fragment } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import FilterAccordian from '../../components/FilterAccordian';
import Meta from '../../components/Meta';
import Pagination from '../../components/Pagination';
import SummaryCard from '../../components/SummaryCard';
import { SUPPORTED_PROVIDERS } from '../../lib/constants';
import useFetch from '../../lib/hooks/useFetch';
import { Genre } from '../../lib/types';
import { fetchAll, fetchGenres } from '../../lib/util/fetch';

type MoviesPageProps = {
  genreList: Genre[];
};

const MoviesPage = ({ genreList }: MoviesPageProps) => {
  const router = useRouter();
  const page =
    router.query.page && Number(router.query.page) > 0
      ? Number(router.query.page)
      : 1;

  const genres = router.query.genres ? String(router.query.genres) : '';
  const providers = router.query.providers
    ? String(router.query.providers)
    : '';

  const { data, error } = useFetch('movie', { page, genres, providers });

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
        providerList={SUPPORTED_PROVIDERS}
      />
      {data && data.results.length > 0 && (
        <>
          <Pagination page={page} pageCount={data!.pageCount} />
          <SimpleGrid columns={[1, 2, 4, 5]} spacing={8}>
            {data.results.map(movie => (
              <Fragment key={movie.id}>
                <SummaryCard type='movie' contentSummary={movie} />
              </Fragment>
            ))}
          </SimpleGrid>
          <Pagination page={page} pageCount={data!.pageCount} />
        </>
      )}
      {data && data.results.length === 0 && (
        <Text>There are no movies matching the selected filters.</Text>
      )}
    </Container>
  );
};

export default MoviesPage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['movie', { page: 1, genres: '', providers: '' }],
    () => fetchAll('movie', { page: 1 })
  );
  const genreList = await fetchGenres('movie');

  return {
    props: { dehydratedState: dehydrate(queryClient), genreList },
    revalidate: 60 * 60 * 1,
  };
};
