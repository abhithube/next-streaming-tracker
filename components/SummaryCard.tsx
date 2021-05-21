import {
  Heading,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { IMAGE_URL } from '../lib/constants';
import { Content, ContentSummary } from '../lib/types';
import { formatReleaseDate } from '../lib/util/format';
import WrapperImage from './WrapperImage';

type SummaryCardProps = {
  type: Content;
  contentSummary: ContentSummary;
};

const SummaryCard = ({ type, contentSummary }: SummaryCardProps) => {
  return (
    <LinkBox
      rounded='lg'
      shadow='md'
      bgColor={useColorModeValue('gray.50', 'gray.900')}
    >
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
        <Text fontSize='sm' color='gray.500'>
          {formatReleaseDate(contentSummary.releaseDate)}
        </Text>
      </VStack>
    </LinkBox>
  );
};

export default SummaryCard;
