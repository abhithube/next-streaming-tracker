import { Box, Heading, Text, VStack } from '@chakra-ui/layout';

import { MovieDetails } from '../lib/types';
import { formatCurrency } from '../lib/util/format';

type Props = {
  movieDetails: MovieDetails;
};

const MovieStats = ({ movieDetails }: Props) => {
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
          {new Date(movieDetails.releaseDate).toLocaleDateString()}
        </Text>
      </Box>
      <Box>
        <Heading as='h3' fontSize='xl'>
          Budget
        </Heading>
        <Text color='gray.400'>{formatCurrency(movieDetails.budget)}</Text>
      </Box>
      <Box>
        <Heading as='h3' fontSize='xl'>
          Revenue
        </Heading>
        <Text color='gray.400'>{formatCurrency(movieDetails.revenue)}</Text>
      </Box>
      <Box>
        <Heading as='h3' fontSize='xl'>
          Studio
        </Heading>
        <Text color='gray.400'>{movieDetails.studio}</Text>
      </Box>
    </VStack>
  );
};

export default MovieStats;
