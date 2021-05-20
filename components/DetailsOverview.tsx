import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';
import { IMAGE_URL } from '../lib/constants';
import { ContentDetails } from '../lib/types';
import {
  formatAgeRating,
  formatReleaseYear,
  formatRuntime,
} from '../lib/util/format';
import WrapperImage from './WrapperImage';

type DetailsOverviewProps = { contentDetails: ContentDetails };

const DetailsOverview = ({ contentDetails }: DetailsOverviewProps) => {
  return (
    <Flex direction='column' align='flex-start' flexBasis='66%'>
      <Heading as='h1' mb='4'>
        {`${contentDetails.title} `}
        {contentDetails.releaseDate && (
          <Text as='span' fontWeight='normal' color='gray.400'>
            ({formatReleaseYear(contentDetails.releaseDate)})
          </Text>
        )}
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
              ({contentDetails.voteCount.toLocaleString()})
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
          mb='8'
          p='2'
          pl='4'
          bgColor='gray.900'
          border='1px'
          borderColor='gray.600'
          rounded='md'
        >
          <Text fontWeight='bold' fontSize='lg'>
            NOW STREAMING ON
          </Text>
          <Flex>
            {contentDetails.providers.map(provider => (
              <Box key={provider.id} m='2' mb='0'>
                <WrapperImage
                  src={IMAGE_URL + provider.logoPath}
                  alt={provider.name}
                  width='36px'
                  height='36px'
                  loading='eager'
                  rounded='md'
                />
              </Box>
            ))}
          </Flex>
        </HStack>
      )}
      <Heading fontSize='xl' mb='2'>
        Overview
      </Heading>
      <Text mb='12' color='gray.400'>
        {contentDetails.overview}
      </Text>
      <SimpleGrid columns={[2, 2, 3]} spacing='2' mb='4' w='100%'>
        {contentDetails.creators.map(person => (
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
