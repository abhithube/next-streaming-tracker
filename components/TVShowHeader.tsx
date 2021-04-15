import { Center, Stack, Text, VStack } from '@chakra-ui/react';

import TVShowOverview from './TVShowOverview';
import WrapperImage from './WrapperImage';
import { TVShowDetails } from '../lib/types';
import { BACKDROP_URL, IMAGE_URL } from '../lib/constants';

type TVShowHeaderProps = { tvShowDetails: TVShowDetails };

const TVShowHeader = ({ tvShowDetails }: TVShowHeaderProps) => {
  return (
    <Center
      bgImg={`
        linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${
          BACKDROP_URL + tvShowDetails.backdropPath
        })
      `}
      bgSize='cover'
      bgRepeat='no-repeat'
      py='16'
      color='white'
    >
      <Stack
        direction={['column', 'column', 'column', 'row']}
        spacing='8'
        w='80%'
        align='center'
      >
        <VStack spacing='4' flexBasis='30%'>
          <WrapperImage
            src={IMAGE_URL + tvShowDetails.posterPath}
            alt={tvShowDetails.name}
            width='300'
            height='450'
            minW='300'
            rounded='lg'
          />
          {tvShowDetails.tagline && (
            <Text fontStyle='italic' color='gray.400'>
              "{tvShowDetails.tagline}"
            </Text>
          )}
        </VStack>
        <TVShowOverview tvShowDetails={tvShowDetails} />
      </Stack>
    </Center>
  );
};

export default TVShowHeader;
