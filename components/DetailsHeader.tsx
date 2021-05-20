import { Center, Stack, Text, VStack } from '@chakra-ui/react';
import { BACKDROP_URL, IMAGE_URL } from '../lib/constants';
import { ContentDetails } from '../lib/types';
import DetailsOverview from './DetailsOverview';
import WrapperImage from './WrapperImage';

type DetailsHeaderProps = { contentDetails: ContentDetails };

const DetailsHeader = ({ contentDetails }: DetailsHeaderProps) => {
  return (
    <Center
      bgImg={`
        linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${
          BACKDROP_URL + contentDetails.backdropPath
        })
      `}
      bgSize='auto 100%'
      h='calc(100vh - 64px)'
      py='16'
      color='white'
    >
      <Stack
        direction={['column', 'column', 'column', 'row']}
        spacing='8'
        w='80%'
        align='center'
      >
        <VStack spacing='4' flexBasis='33%'>
          <WrapperImage
            src={IMAGE_URL + contentDetails.posterPath}
            alt={contentDetails.title}
            width='360'
            height='540'
            loading='eager'
            rounded='lg'
          />
          {contentDetails.tagline && (
            <Text fontSize='lg' fontStyle='italic' color='gray.400'>
              "{contentDetails.tagline}"
            </Text>
          )}
        </VStack>
        <DetailsOverview contentDetails={contentDetails} />
      </Stack>
    </Center>
  );
};

export default DetailsHeader;
