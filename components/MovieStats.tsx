import { Box, Heading, Text, VStack } from '@chakra-ui/layout';

import { MovieDetails } from '../lib/types';
import { formatCurrency, formatReleaseYear } from '../lib/util/format';

type MovieStatsProps = { movieDetails: MovieDetails };

const MovieStats = ({ movieDetails }: MovieStatsProps) => {
  return (
    <VStack align='flex-start' spacing='4'>
      <Box>
        <Heading as='h3' fontSize='xl'>
          Status
        </Heading>
        <Text color='gray.400'>{movieDetails.status}</Text>
      </Box>
      <Box>
        <Heading as='h3' fontSize='xl'>
          Release Date
        </Heading>
        <Text color='gray.400'>
          {formatReleaseYear(movieDetails.releaseDate)}
        </Text>
      </Box>
      <Box>
        <Heading as='h3' fontSize='xl'>
          Budget
        </Heading>
        <Text color='gray.400'>
          {movieDetails.budget ? formatCurrency(movieDetails.budget) : 'N/A'}
        </Text>
      </Box>
      <Box>
        <Heading as='h3' fontSize='xl'>
          Revenue
        </Heading>
        <Text color='gray.400'>
          {movieDetails.revenue ? formatCurrency(movieDetails.revenue) : 'N/A'}
        </Text>
      </Box>
      <Box>
        <Heading as='h3' fontSize='xl'>
          Studio
        </Heading>
        <Text color='gray.400'>{movieDetails.studio || 'N/A'}</Text>
      </Box>
    </VStack>
  );
};

export default MovieStats;