import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  LinkBox,
  LinkOverlay,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FcFilmReel } from 'react-icons/fc';
import Search from './Search';

const Navbar = () => {
  const { toggleColorMode } = useColorMode();

  const color = useColorModeValue('red.500', 'red.200');

  return (
    <Center
      as='nav'
      w='100%'
      pos='fixed'
      zIndex='1'
      h='16'
      bgColor={useColorModeValue('gray.50', 'gray.900')}
    >
      <HStack w='80%' spacing='8'>
        <LinkBox>
          <NextLink href='/' passHref>
            <LinkOverlay>
              <HStack spacing='1'>
                <Icon as={FcFilmReel} fontSize='3xl' />
                <Heading
                  fontSize='2xl'
                  bgGradient='linear(to-r, red.500, purple.400)'
                  bgClip='text'
                >
                  Trackit!
                </Heading>
              </HStack>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
        <HStack spacing='8' w='100%'>
          <Box _hover={{ color }}>
            <Link as={NextLink} href='/movie'>
              Movies
            </Link>
          </Box>
          <Box _hover={{ color }}>
            <Link as={NextLink} href='/tv'>
              TV Shows
            </Link>
          </Box>
          <Box _hover={{ color }}>
            <Link as={NextLink} href='/about'>
              About
            </Link>
          </Box>
        </HStack>
        <Search />
        <IconButton
          aria-label='toggle dark mode'
          onClick={toggleColorMode}
          icon={useColorModeValue(<FaMoon />, <FaSun />)}
          ml='6'
        />
      </HStack>
    </Center>
  );
};

export default Navbar;
