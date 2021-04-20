import Image from 'next/image';
import { Box, Center, Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as='footer'
      h='64px'
      pos='absolute'
      w='100%'
      bottom='0'
      bgColor='gray.800'
    >
      <Center h='100%'>
        <Text as='span' color='white' mr='4'>
          Powered by
        </Text>
        <Box as='span' h='20px' mr='6'>
          <Image
            src='/tmdb.svg'
            alt='TMDB logo'
            width='150'
            height='20'
            loading='eager'
          />
        </Box>
        <Box as='span' h='20px'>
          <Image
            src='/justwatch.png'
            alt='Just Watch logo'
            width='133'
            height='20'
            loading='eager'
          />
        </Box>
      </Center>
    </Box>
  );
};

export default Footer;
