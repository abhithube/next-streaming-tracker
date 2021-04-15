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
import { MovieSummary } from '../lib/types';
import { IMAGE_URL } from '../lib/constants';
import { formatReleaseDate } from '../lib/util/format';

type MovieCardProps = { movieSummary: MovieSummary };

const MovieCard = ({ movieSummary }: MovieCardProps) => {
  return (
    <LinkBox roundedBottom='lg' shadow='md'>
      <Link href={`/movies/${movieSummary.slug}`} passHref>
        <LinkOverlay>
          <WrapperImage
            src={IMAGE_URL + movieSummary.posterPath}
            alt={movieSummary.title}
            width={300}
            height={450}
            roundedTop='lg'
          />
        </LinkOverlay>
      </Link>
      <VStack align='stretch' p='4' pt='2'>
        <HStack>
          <Icon as={AiFillStar} fontSize='xl' color='yellow.400' />
          <Text>{movieSummary.voteAverage}</Text>
        </HStack>
        <Heading as='h3' fontSize='xl' noOfLines={2}>
          {movieSummary.title}
        </Heading>
        <Text fontSize='sm' color='gray.500'>
          {formatReleaseDate(movieSummary.releaseDate)}
        </Text>
      </VStack>
    </LinkBox>
  );
};

export default MovieCard;
