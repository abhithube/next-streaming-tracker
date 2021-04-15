import { Heading, Text, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';

import { Review } from '../lib/types';
import ReviewCard from './ReviewCard';

type ReviewListProps = {
  reviews: Review[];
};

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <VStack spacing='4' my='8' align='flex-start'>
      <Heading>Top Reviews</Heading>
      {reviews.map((review) => (
        <Fragment key={review.id}>
          <ReviewCard review={review} />
        </Fragment>
      ))}
      {reviews.length == 0 && <Text>There are no reviews for this title.</Text>}
    </VStack>
  );
};

export default ReviewList;
