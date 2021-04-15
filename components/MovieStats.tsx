import { Box, Heading, Text, VStack } from '@chakra-ui/react';

import { MovieDetails } from '../lib/types';
import { formatCurrency } from '../lib/util/format';

type MovieStatsProps = { movieDetails: MovieDetails };

const MovieStats = ({ movieDetails }: MovieStatsProps) => {
  return (
    <VStack align='flex-start' spacing='4' flexBasis='20%'>
      <Box>
        <Heading as='h3' fontSize='xl'>
          Status
        </Heading>
        <Text color='gray.400'>{movieDetails.status}</Text>
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
