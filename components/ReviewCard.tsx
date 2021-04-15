import { useEffect, useRef, useState } from 'react';
import { Box, Button, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';

import { Review } from '../lib/types';
import { formatReleaseDate } from '../lib/util/format';

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const contentRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (
      shouldShowMore &&
      contentRef.current &&
      contentRef.current.getBoundingClientRect().bottom > window.innerHeight
    ) {
      contentRef.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, [shouldShowMore]);

  return (
    <Box
      rounded='lg'
      bgColor='gray.100'
      shadow='md'
      w='100%'
      p='4'
      ref={contentRef}
    >
      <HStack>
        <Heading
          as='h3'
          fontSize='xl'
        >{`A Review by ${review.author}`}</Heading>
        {review.rating && (
          <HStack
            spacing='1'
            fontWeight='light'
            as='span'
            bgColor='black'
            color='white'
            px='2'
            rounded='md'
          >
            <Icon as={AiFillStar} verticalAlign='middle' />
            <Text>{review.rating}.0</Text>
          </HStack>
        )}
      </HStack>
      <Text fontSize='sm' color='gray.500' mb='4'>
        Published on {formatReleaseDate(review.createdAt)}
      </Text>
      <Text noOfLines={shouldShowMore ? 0 : 5} whiteSpace='pre-line'>
        {review.content}
      </Text>
      {!shouldShowMore && (
        <Button
          onClick={() => {
            setShouldShowMore(true);
          }}
          colorScheme='gray'
          mt='2'
          textDecoration='underline'
        >
          Read the rest
        </Button>
      )}
    </Box>
  );
};

export default ReviewCard;
