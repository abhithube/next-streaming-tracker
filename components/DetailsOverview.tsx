import { Fragment } from 'react';
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import { ContentDetails } from '../lib/types';
import {
  formatAgeRating,
  formatReleaseYear,
  formatRuntime,
} from '../lib/util/format';
import { IMAGE_URL } from '../lib/constants';
import { AiFillStar } from 'react-icons/ai';

type DetailsOverviewProps = { contentDetails: ContentDetails };

const DetailsOverview = ({ contentDetails }: DetailsOverviewProps) => {
  return (
    <Flex direction='column' align='flex-start' flexBasis='66%'>
      <Heading as='h1' mb='4'>
        {`${contentDetails.title} `}
        <Text as='span' fontWeight='normal' color='gray.400'>
          ({formatReleaseYear(contentDetails.releaseDate)})
        </Text>
      </Heading>
      <HStack h='6' mb='6'>
        <Badge
          variant='outline'
          fontSize='sm'
          colorScheme={formatAgeRating(contentDetails.ageRating)}
        >
          {contentDetails.ageRating}
        </Badge>
        <Divider orientation='vertical' />
        <HStack spacing='0.5'>
          <Icon as={AiFillStar} fontSize='xl' color='yellow.400' mr='0.5' />
          <Text>
            {contentDetails.voteAverage.toFixed(1)}{' '}
            <Text as='span' color='gray.400'>
              ({contentDetails.voteCount})
            </Text>
          </Text>
        </HStack>
        <Divider orientation='vertical' />
        <Text>{contentDetails.genres}</Text>
        {contentDetails.runtime && (
          <>
            <Divider orientation='vertical' />
            <Text>{formatRuntime(contentDetails.runtime)}</Text>
          </>
        )}
      </HStack>
      {contentDetails.providers.length > 0 && (
        <HStack
          spacing='4'
          mb='8'
          px='4'
          py='2'
          bgColor='gray.900'
          border='1px'
          borderColor='gray.600'
          rounded='md'
        >
          <Text fontWeight='bold' fontSize='lg'>
            NOW STREAMING ON
          </Text>
          {contentDetails.providers.map((provider) => (
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
      <Text mb='12' color='gray.400'>
        {contentDetails.overview}
      </Text>
      <SimpleGrid columns={[2, 2, 3]} spacing='2' mb='4' w='100%'>
        {contentDetails.creators.map((person) => (
          <Box key={person.id} pr='8'>
            <Text fontWeight='bold'>{person.name}</Text>
            <Text color='gray.400'>{person.job}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default DetailsOverview;
