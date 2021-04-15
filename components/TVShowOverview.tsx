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

import { TVShowDetails } from '../lib/types';
import {
  formatTVRating,
  formatReleaseDate,
  formatReleaseYear,
  formatRuntime,
} from '../lib/util/format';
import { IMAGE_URL } from '../lib/constants';

type TVShowOverviewProps = { tvShowDetails: TVShowDetails };

const TVShowOverview = ({ tvShowDetails }: TVShowOverviewProps) => {
  return (
    <Flex direction='column' align='flex-start' flexBasis='80%'>
      <Heading as='h1' mb='4'>
        {`${tvShowDetails.name} `}
        <Text as='span' fontWeight='normal' color='gray.400'>
          ({formatReleaseYear(tvShowDetails.firstAirDate)})
        </Text>
      </Heading>
      <HStack h='6' mb='6'>
        <Badge
          variant='outline'
          fontSize='sm'
          colorScheme={formatTVRating(tvShowDetails.ageRating)}
        >
          {tvShowDetails.ageRating}
        </Badge>
        <Text>{formatReleaseDate(tvShowDetails.firstAirDate)}</Text>
        <Divider orientation='vertical' />
        <Text>{tvShowDetails.genres}</Text>
        {tvShowDetails.runtime && (
          <>
            <Divider orientation='vertical' />
            <Text>{formatRuntime(tvShowDetails.runtime)}</Text>
          </>
        )}
      </HStack>
      {tvShowDetails.providers.length > 0 && (
        <HStack
          spacing='4'
          mb='6'
          px='6'
          py='4'
          bgColor='gray.900'
          border='1px'
          borderColor='gray.600'
          rounded='2xl'
        >
          <Text fontWeight='bold' fontSize='lg'>
            NOW STREAMING ON
          </Text>
          {tvShowDetails.providers.map((provider) => (
            <Fragment key={provider.id}>
              <Image
                src={IMAGE_URL + provider.logoPath}
                alt={provider.name}
                w='45px'
                height='45px'
                rounded='md'
              />
            </Fragment>
          ))}
        </HStack>
      )}
      <Heading fontSize='xl' mb='2'>
        Overview
      </Heading>
      <Text mb='6' color='gray.400'>
        {tvShowDetails.overview}
      </Text>
      <SimpleGrid columns={[2, 2, 3]} spacing='2' mb='4' w='100%'>
        {tvShowDetails.creators.map((name) => (
          <Box key={name} pr='8'>
            <Text fontWeight='bold'>{name}</Text>
            <Text color='gray.400'>Creator</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default TVShowOverview;
