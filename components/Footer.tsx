import {
  Box,
  Center,
  Divider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';

const Footer = () => {
  return (
    <Box
      as='footer'
      h='64px'
      pos='absolute'
      w='100%'
      bottom='0'
      bgColor={useColorModeValue('gray.100', 'gray.900')}
    >
      <Center h='100%'>
        <Text as='span' mr='4'>
          Powered by
        </Text>
        <Box as='span' h='20px'>
          <Image
            src='/tmdb.svg'
            alt='TMDB logo'
            width='150'
            height='20'
            loading='eager'
          />
        </Box>
        <Divider
          orientation='vertical'
          mx='4'
          height='50%'
          borderColor='gray.400'
        />
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
