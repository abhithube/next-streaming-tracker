import { Box, Heading, Text } from '@chakra-ui/react';

import { Review } from '../lib/types';

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Box>
      <Heading>{review.author}</Heading>
      <Text>{review.content}</Text>
    </Box>
  );
};

export default ReviewCard;
