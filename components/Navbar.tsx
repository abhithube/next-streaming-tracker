import * as React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { FcFilmReel } from 'react-icons/fc';

import Search from './Search';

const Navbar = () => {
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
              <HStack spacing='1'>
                <Icon as={FcFilmReel} fontSize='3xl' />
                <Heading
                  fontSize='2xl'
                  bgGradient='linear(to-r, green.300, blue.300)'
                  bgClip='text'
                >
                  TrackIt!
                </Heading>
              </HStack>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
        <HStack spacing='4' w='100%'>
          <Box _hover={{ color: 'blue.300' }}>
            <Link as={NextLink} href='/movie' _hover={{ color: 'blue.300' }}>
              Movies
            </Link>
          </Box>
          <Box _hover={{ color: 'blue.300' }}>
            <Link as={NextLink} href='/tv'>
              TV Shows
            </Link>
          </Box>
        </HStack>
        <Search />
      </HStack>
    </Center>
  );
};

export default Navbar;
