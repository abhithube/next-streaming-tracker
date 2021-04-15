import { Box, Heading, Text, VStack } from '@chakra-ui/react';

import WrapperImage from './WrapperImage';
import { Actor } from '../lib/types';
import { IMAGE_URL } from '../lib/constants';

type ActorCardProps = {
  actor: Actor;
};

const ActorCard = ({ actor }: ActorCardProps) => {
  return (
    <Box bgColor='white' rounded='lg' shadow='md' minW='20%' m='2'>
      <WrapperImage
        src={IMAGE_URL + actor.profilePath}
        width={300}
        height={450}
        roundedTop='lg'
      />
      <VStack align='stretch' p='4' pt='2'>
        <Heading as='h3' fontSize='xl' noOfLines={2}>
          {actor.name}
        </Heading>
        <Text fontSize='sm' color='gray.500'>
          {actor.character}
        </Text>
      </VStack>
    </Box>
  );
};

export default ActorCard;
