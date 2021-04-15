import { Fragment, useEffect, useRef } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';

import { Actor } from '../lib/types';
import ActorCard from './ActorCard';

type CastListProps = {
  cast: Actor[];
};

const CastList = ({ cast }: CastListProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box className='bork' w='100%' pos='relative'>
      <Heading>Top Billed Cast</Heading>
      <Flex
        overflowX='auto'
        css={{ scrollSnapType: 'x mandatory' }}
        ref={scrollRef}
      >
        {cast.map((actor) => (
          <Fragment key={actor.id}>
            <ActorCard actor={actor} />
          </Fragment>
        ))}
      </Flex>
    </Box>
  );
};

export default CastList;
