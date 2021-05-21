import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IMAGE_URL } from '../lib/constants';
import useDebounce from '../lib/hooks/useDebounce';
import useSearch from '../lib/hooks/useSearch';
import { SearchResult } from '../lib/types';
import WrapperImage from './WrapperImage';

const Search = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [shouldShow, setShouldShow] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data } = useSearch(debouncedSearch);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const color = useColorModeValue('gray.900', 'gray.50');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const hoverColor = useColorModeValue('gray.100', 'gray.800');

  useEffect(() => {
    if (data) {
      setResults(data.slice(0, 5));
      setShouldShow(true);
    }
  }, [data]);

  useEffect(() => {
    if (debouncedSearch.length === 0) setResults([]);
  }, [debouncedSearch]);

  const handleClick = (e: MouseEvent) => {
    if (e.target === inputRef.current) setShouldShow(true);
    else if ((e.target as HTMLElement).parentNode !== divRef.current) {
      setShouldShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<Icon as={FaSearch} color='gray.500' />}
        />
        <Input
          w='20vw'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search movies or TV shows...'
          ref={inputRef}
          borderColor='gray.500'
          _hover={{ borderColor: 'gray.400' }}
        />
      </InputGroup>
      {shouldShow && (
        <Flex
          direction='column'
          w='20%'
          pos='absolute'
          color={color}
          bgColor={bgColor}
          ref={divRef}
        >
          {results.map((result, index) => (
            <LinkBox key={index} _hover={{ bgColor: hoverColor }}>
              <HStack p='2'>
                <WrapperImage
                  src={IMAGE_URL + result.posterPath}
                  alt={result.title}
                  width='30'
                  height='45'
                  rounded='sm'
                />
                <Link href={`/${result.type}/${result.id}`} passHref>
                  <LinkOverlay onClick={() => setSearch('')}>
                    <Text as='span' noOfLines={1}>
                      {result.title}
                    </Text>
                  </LinkOverlay>
                </Link>
              </HStack>
              <Divider />
            </LinkBox>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Search;
