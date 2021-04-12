import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { FcFilmReel } from 'react-icons/fc';

const Navbar = () => {
  const router = useRouter();
  return (
    <Center
      as='nav'
      w='100%'
      pos='fixed'
      zIndex='1'
      h='16'
      bg='blue.900'
      color='white'
    >
      <HStack w='80%' spacing='8'>
        <LinkBox>
          <NextLink href='/' passHref>
            <LinkOverlay>
              <HStack spacing='1' color='green.300'>
                <Icon as={FcFilmReel} fontSize='3xl' />
                <Heading fontSize='2xl'>StreamDB</Heading>
              </HStack>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
        <HStack spacing='4'>
          <Box _hover={{ color: 'green.300' }}>
            <Link as={NextLink} href='/movies'>
              Movies
            </Link>
          </Box>
          <Box _hover={{ color: 'green.300' }}>
            <Link as={NextLink} href='/tv'>
              TV
            </Link>
          </Box>
        </HStack>
      </HStack>
    </Center>
  );
};

export default Navbar;
