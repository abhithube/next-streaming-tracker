import NextImage from 'next/image';
import { Center, chakra, Divider, Stack, Text, VStack } from '@chakra-ui/react';

import { MovieDetails } from '../lib/types';
import { BACKDROP_URL, LOGO_URL, POSTER_URL } from '../lib/constants';
import MovieStats from './MovieStats';
import MovieOverview from './MovieOverview';

type Props = {
  movieDetails: MovieDetails;
};

const MovieHeader = ({ movieDetails }: Props) => {
  return (
    <Center
      bgImg={`
        linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${
          BACKDROP_URL + movieDetails.backdropPath
        })
      `}
      bgSize='cover'
      bgRepeat='no-repeat'
      py='16'
      color='white'
    >
      <Stack
        direction={['column', 'column', 'column', 'row']}
        spacing='8'
        w='80%'
        align='center'
      >
        <VStack spacing='4'>
          <ChakraImage
            src={`${POSTER_URL + movieDetails.posterPath}`}
            width='360'
            height='540'
            borderRadius='lg'
          />
          {movieDetails.tagline && (
            <Text fontStyle='italic' color='gray.400'>
              "{movieDetails.tagline}"
            </Text>
          )}
        </VStack>
        <MovieOverview movieDetails={movieDetails} />
        <Divider orientation='vertical' h='200' />
        <MovieStats movieDetails={movieDetails} />
      </Stack>
    </Center>
  );
};

const ChakraImage = chakra(NextImage, {
  shouldForwardProp: (prop) => ['width', 'height', 'src'].includes(prop),
});

export default MovieHeader;
