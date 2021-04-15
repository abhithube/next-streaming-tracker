import Link from 'next/link';
import {
  Heading,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';

import WrapperImage from './WrapperImage';
import { TVShowSummary } from '../lib/types';
import { IMAGE_URL } from '../lib/constants';

type TVShowCardProps = { tvShowSummary: TVShowSummary };

const TVShowCard = ({ tvShowSummary }: TVShowCardProps) => {
  return (
    <LinkBox roundedBottom='lg' shadow='md'>
      <Link href={`/tv/${tvShowSummary.slug}`} passHref>
        <LinkOverlay>
          <WrapperImage
            src={IMAGE_URL + tvShowSummary.posterPath}
            width={300}
            height={450}
            roundedTop='lg'
          />
        </LinkOverlay>
      </Link>
      <VStack align='stretch' p='4' pt='2'>
        <HStack>
          <Icon as={AiFillStar} fontSize='xl' color='yellow.400' />
          <Text>{tvShowSummary.voteAverage}</Text>
        </HStack>
        <Heading as='h3' fontSize='xl' noOfLines={2}>
          {tvShowSummary.name}
        </Heading>
        <Text fontSize='sm' color='gray.500'>
          {new Date(tvShowSummary.firstAirDate).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })}
        </Text>
      </VStack>
    </LinkBox>
  );
};

export default TVShowCard;
