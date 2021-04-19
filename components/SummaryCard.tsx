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
import { Content, ContentSummary } from '../lib/types';
import { IMAGE_URL } from '../lib/constants';
import { formatReleaseDate } from '../lib/util/format';

type SummaryCardProps = { type: Content; contentSummary: ContentSummary };

const SummaryCard = ({ type, contentSummary }: SummaryCardProps) => {
  return (
    <LinkBox roundedBottom='lg' shadow='md'>
      <WrapperImage
        src={IMAGE_URL + contentSummary.posterPath}
        alt={contentSummary.title}
        width={360}
        height={540}
        roundedTop='lg'
      />
      <VStack align='stretch' p='4' pt='2'>
        <HStack>
          <Icon as={AiFillStar} fontSize='xl' color='yellow.400' />
          <Text>{contentSummary.voteAverage.toFixed(1)}</Text>
        </HStack>
        <Link href={`/${type}/${contentSummary.id}`} passHref>
          <LinkOverlay>
            <Heading fontSize='xl' noOfLines={2}>
              {contentSummary.title}
            </Heading>
          </LinkOverlay>
        </Link>
        <Text fontSize='sm' color='gray.600'>
          {formatReleaseDate(contentSummary.releaseDate)}
        </Text>
      </VStack>
    </LinkBox>
  );
};

export default SummaryCard;
