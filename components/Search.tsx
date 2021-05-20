import {
  Box,
  Divider,
  Flex,
  HStack,
  Input,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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
      <Input
        w='33vw'
        bgColor='white'
        color='black'
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder='Search movies or TV shows...'
        ref={inputRef}
      />
      {shouldShow && (
        <Flex
          direction='column'
          w='33vw'
          pos='absolute'
          zIndex='1'
          align='stretch'
          color='black'
          bgColor='white'
          border='1px solid black'
          ref={divRef}
        >
          {results.map((result, index) => (
            <LinkBox key={index} _hover={{ bgColor: 'gray.100' }}>
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
              <Divider w='100%' borderWidth='0.5px' />
            </LinkBox>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Search;
