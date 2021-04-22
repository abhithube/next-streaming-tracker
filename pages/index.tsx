import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import Meta from '../components/Meta';
import WrapperImage from '../components/WrapperImage';
import { BACKDROP_URL, IMAGE_URL } from '../lib/constants';
import { ContentSummary } from '../lib/types';
import { fetchAll } from '../lib/util/fetch';

type HomeProps = {
  movies: ContentSummary[];
  tvShows: ContentSummary[];
  backdropPath: string;
};

export default function Home({ movies, tvShows, backdropPath }: HomeProps) {
  return (
    <Container maxW='80%' pt='8' pb='32'>
      <Meta
        title='StreamDB'
        description="StreamDB is a streaming tracker for movies and TV shows. See what's currently streaming on Netflix, Hulu, Amazon Prime, Disney+, and HBO Max"
      />
      <Box
        pos='relative'
        mb='8'
        pb='33%'
        bgImg={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${
          BACKDROP_URL + backdropPath
        })`}
        bgSize='cover'
        bgRepeat='no-repeat'
        rounded='xl'
        boxShadow='2xl'
      >
        <VStack
          align='flex-start'
          bottom='0'
          p='5%'
          pos='absolute'
          color='white'
        >
          <Heading as='h1' fontSize='7xl'>
            Welcome to Trackit!
          </Heading>
          <Text fontSize='xl'>
            Track the most popular movies and TV shows on the most popular
            streaming services.
          </Text>
        </VStack>
      </Box>
      <Box mb='8'>
        <Heading mb='4'>Trending Movies</Heading>
        <SimpleGrid columns={[1, 1, 5, 5]} spacing={8}>
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <a>
                <WrapperImage
                  src={IMAGE_URL + movie.posterPath}
                  alt={movie.title}
                  width={360}
                  height={540}
                  rounded='lg'
                />
              </a>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
      <Box>
        <Heading mb='4'>Trending TV Shows</Heading>
        <SimpleGrid columns={[1, 1, 5, 5]} spacing={8}>
          {tvShows.map((tvShow) => (
            <Link key={tvShow.id} href={`/tv/${tvShow.id}`}>
              <a>
                <WrapperImage
                  src={IMAGE_URL + tvShow.posterPath}
                  alt={tvShow.title}
                  width={360}
                  height={540}
                  rounded='lg'
                />
              </a>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [{ results: movies }, { results: tvShows }] = await Promise.all([
    fetchAll('movie', { page: 1 }),
    fetchAll('tv', { page: 1 }),
  ]);

  const backdropPath = movies[Math.floor(Math.random() * 5)].backdropPath;

  return {
    props: {
      movies: movies.slice(0, 5),
      tvShows: tvShows.slice(0, 5),
      backdropPath,
    },
  };
};
