import { Fragment } from 'react';
import { Box, Flex, Heading, VStack } from '@chakra-ui/react';

import { Actor } from '../lib/types';
import ActorCard from './ActorCard';

type CastListProps = {
  cast: Actor[];
};

const CastList = ({ cast }: CastListProps) => {
  return (
    <Box my='8'>
      <Heading mb='4'>Top Billed Cast</Heading>
      <Box bgColor='gray.100' p='4' rounded='lg'>
        <Flex overflowX='auto'>
          {cast.map((actor) => (
            <Fragment key={actor.id}>
              <ActorCard actor={actor} />
            </Fragment>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default CastList;
