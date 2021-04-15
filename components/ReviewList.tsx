import { VStack } from '@chakra-ui/react';
import { Fragment } from 'react';

import { Review } from '../lib/types';
import ReviewCard from './ReviewCard';

type ReviewListProps = {
  reviews: Review[];
};

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <VStack>
      {reviews.map((review) => (
        <Fragment key={review.id}>
          <ReviewCard review={review} />
        </Fragment>
      ))}
    </VStack>
  );
};

export default ReviewList;
