import {
  Center,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import MovieStats from './MovieStats';
import MovieOverview from './MovieOverview';
import WrapperImage from './WrapperImage';
import { MovieDetails } from '../lib/types';
import { BACKDROP_URL, IMAGE_URL } from '../lib/constants';
import { formatReleaseYear } from '../lib/util/format';

type MovieHeaderProps = { movieDetails: MovieDetails };

const MovieHeader = ({ movieDetails }: MovieHeaderProps) => {
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
        <VStack spacing='4' flexBasis='30%'>
          <WrapperImage
            src={IMAGE_URL + movieDetails.posterPath}
            width='300'
            height='450'
            minW='300'
            rounded='lg'
          />
          {movieDetails.tagline && (
            <Text fontStyle='italic' color='gray.400'>
              "{movieDetails.tagline}"
            </Text>
          )}
        </VStack>
        <HStack spacing='8' flexBasis='70%'>
          <MovieOverview movieDetails={movieDetails} />
          <Divider orientation='vertical' h='200' />
          <MovieStats movieDetails={movieDetails} />
        </HStack>
      </Stack>
    </Center>
  );
};

export default MovieHeader;
