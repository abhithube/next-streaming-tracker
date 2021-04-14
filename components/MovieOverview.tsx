import { Fragment } from 'react';
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import { MovieDetails } from '../lib/types';
import {
  formatRating,
  formatReleaseYear,
  formatRuntime,
} from '../lib/util/format';
import { LOGO_URL } from '../lib/constants';

type MovieOverviewProps = { movieDetails: MovieDetails };

const MovieOverview = ({ movieDetails }: MovieOverviewProps) => {
  return (
    <Flex direction='column' align='flex-start' flexBasis='50%'>
      <HStack mb='2'>
        <Heading as='h1'>
          {movieDetails.title}{' '}
          <Text as='span' fontWeight='normal' color='gray.400'>
            ({formatReleaseYear(movieDetails.releaseDate)})
          </Text>
        </Heading>
      </HStack>
      <HStack h='6' mb='6'>
        <Badge
          variant='outline'
          fontSize='sm'
          colorScheme={formatRating(movieDetails.ageRating)}
        >
          {movieDetails.ageRating}
        </Badge>
        <Text>{movieDetails.voteAverage}</Text>
        <Divider orientation='vertical' />
        <Text>{movieDetails.genres}</Text>
        {movieDetails.runtime && (
          <>
            <Divider orientation='vertical' />
            <Text>{formatRuntime(movieDetails.runtime)}</Text>
          </>
        )}
      </HStack>
      {movieDetails.providers.length > 0 && (
        <HStack
          spacing='4'
          mb='6'
          px='6'
          py='4'
          bgColor='gray.900'
          border='1px'
          borderColor='gray.600'
          borderRadius='2xl'
        >
          <Heading as='h3' fontSize='lg'>
            NOW STREAMING ON
          </Heading>
          {movieDetails.providers.map((provider) => (
            <Fragment key={provider.id}>
              <Image
                src={`${LOGO_URL + provider.logoPath}`}
                w='45px'
                height='45px'
                borderRadius='md'
              />
            </Fragment>
          ))}
        </HStack>
      )}
      <Heading as='h3' fontSize='xl' mb='2'>
        Overview
      </Heading>
      <Text mb='6' color='gray.400'>
        {movieDetails.overview}
      </Text>
      <SimpleGrid columns={[2, 2, 3]} spacing='2' mb='4' w='100%'>
        {movieDetails.creators.map((person) => (
          <Box key={person.id} pr='8'>
            <Text fontWeight='bold'>{person.name}</Text>
            <Text color='gray.400'>{person.job}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default MovieOverview;
