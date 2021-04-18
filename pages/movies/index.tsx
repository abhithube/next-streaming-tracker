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

import MovieCard from '../../components/MovieCard';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import Meta from '../../components/Meta';
import useMovies from '../../lib/hooks/useMovies';
import { Genre, MovieSummary, Provider } from '../../lib/types';
import { fetchGenres, fetchMovies } from '../../lib/util/fetch';
import { SUPPORTED_PROVIDERS } from '../../lib/constants';

type MoviesPageProps = {
  initMovies: MovieSummary[];
  initPageCount: number;
  genreList: Genre[];
  providerList: Provider[];
};

type QueryDef = {
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

  const [genres, setGenres] = useState<Genre[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);

  const [query, setQuery] = useState<QueryDef>({ genres, providers });

  const { data, error } = useMovies({
    page,
    query,
    initialData: { movies: initMovies, pageCount: initPageCount },
  });

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [page]);

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
      <Heading as='h1' mb='8'>
        Popular Movies
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
