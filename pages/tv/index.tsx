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

type TVShowsPageProps = {
  genreList: Genre[];
};

const TVShowsPage = ({ genreList }: TVShowsPageProps) => {
  const router = useRouter();
  const page =
    router.query.page && Number(router.query.page) > 0
      ? Number(router.query.page)
      : 1;

  const genres = router.query.genres ? String(router.query.genres) : '';
  const providers = router.query.providers
    ? String(router.query.providers)
    : '';

  const { data, error } = useFetch('tv', { page, genres, providers });

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
        providerList={SUPPORTED_PROVIDERS}
      />
      {data && data.results.length > 0 && (
        <>
          <Pagination page={page} pageCount={data!.pageCount} />
          <SimpleGrid columns={[1, 2, 4, 5]} spacing={8}>
            {data.results.map(tvShow => (
              <Fragment key={tvShow.id}>
                <SummaryCard type='tv' contentSummary={tvShow} />
              </Fragment>
            ))}
          </SimpleGrid>
          <Pagination page={page} pageCount={data!.pageCount} />
        </>
      )}
      {data && data.results.length === 0 && (
        <Text>There are no TV shows matching the selected filters.</Text>
      )}
    </Container>
  );
};

export default TVShowsPage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['tv', { page: 1, genres: '', providers: '' }],
    () => fetchAll('tv', { page: 1 })
  );
  const genreList = await fetchGenres('tv');

  return {
    props: { dehydratedState: dehydrate(queryClient), genreList },
    revalidate: 60 * 60 * 1,
  };
};
