import Image from 'next/image';
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

import { MovieSummary } from '../lib/types';

type Props = {
  movieSummary: MovieSummary;
};

const MovieCard = ({ movieSummary }: Props) => {
  return (
    <LinkBox borderRadius='lg' overflow='hidden' borderWidth='thin' shadow='md'>
      <Link href={`/movies/${movieSummary.slug}`} passHref>
        <LinkOverlay>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/original${movieSummary.posterPath}`}
            width={300}
            height={450}
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
          {new Date(movieSummary.releaseDate).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })}
        </Text>
      </VStack>
    </LinkBox>
  );
};

export default MovieCard;
