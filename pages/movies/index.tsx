import { Fragment, useState } from 'react';
import { GetStaticProps } from 'next';
import { Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import MovieCard from '../../components/MovieCard';
import ProvidersFilter from '../../components/ProvidersFilter';
import Pagination from '../../components/Pagination';
import Meta from '../../components/Meta';
import useMovies from '../../lib/hooks/useMovies';
import { Genre, MovieSummary, Provider } from '../../lib/types';
import { fetchGenres, fetchMovies } from '../../lib/util/fetch';
import { SUPPORTED_PROVIDERS } from '../../lib/constants';
import GenresFilter from '../../components/GenresFilter';
import usePrefetchMovies from '../../lib/hooks/usePrefetchMovies';

type MoviesPageProps = {
  initMovies: MovieSummary[];
  initPageCount: number;
  genreList: Genre[];
  providerList: Provider[];
};

const MoviesPage = ({
  initMovies,
  initPageCount,
  genreList,
  providerList,
}: MoviesPageProps) => {
  const [page, setPage] = useState(1);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const { data, error } = useMovies({
    page,
    genres,
    providers,
    initialData: { movies: initMovies, pageCount: initPageCount },
  });

  usePrefetchMovies({ page, providers, genres, pageCount: data!.pageCount });

  if (error)
    return (
      <Text>
        Our selection of movie titles is not available at this time. Try again
        later.
      </Text>
    );

  return (
    <Container maxW='80%' mt='8' mb='16'>
      <Meta
        title='Movies'
        description='Popular movies currently streaming on Netflix, Hulu, Amazon Prime, Disney+, and HBO Max'
      />
      <Heading as='h1' mb='4'>
        Popular Movies
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
      {data!.movies.length > 0 ? (
        <>
          <Pagination
            page={page}
            pageCount={data!.pageCount}
            setPage={setPage}
          />
          <SimpleGrid columns={[1, 2, 4, 5]} spacing={8}>
            {data!.movies.map((movie) => (
              <Fragment key={movie.id}>
                <MovieCard movieSummary={movie} />
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
        <Text>There are no movie titles matching the selected filters.</Text>
      )}
    </Container>
  );
};

export default MoviesPage;

export const getStaticProps: GetStaticProps = async () => {
  const [{ movies, pageCount }, genreList] = await Promise.all([
    fetchMovies({ page: 1 }),
    fetchGenres('movie'),
  ]);

  return {
    props: {
      initMovies: movies,
      initPageCount: pageCount,
      genreList,
      providerList: SUPPORTED_PROVIDERS,
    },
  };
};
