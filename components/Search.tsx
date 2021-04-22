import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  HStack,
  Input,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

import useDebounce from '../lib/hooks/useDebounce';
import useSearch from '../lib/hooks/useSearch';
import { SearchResult } from '../lib/types';
import { IMAGE_URL } from '../lib/constants';

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
        w='500px'
        bgColor='white'
        color='black'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search movies or TV shows...'
        ref={inputRef}
      />
      {shouldShow && (
        <VStack
          w='500px'
          pos='absolute'
          zIndex='1'
          align='flex-start'
          color='black'
          bgColor='white'
          border='1px solid black'
          ref={divRef}
        >
          {results.map((result, index) => (
            <LinkBox key={index}>
              <HStack px='2' py='1'>
                <Image
                  src={IMAGE_URL + result.posterPath}
                  alt={result.title}
                  width='30'
                  height='45'
                />
                <Link href={`/${result.type}/${result.id}`} passHref>
                  <LinkOverlay onClick={() => setSearch('')}>
                    <Text as='span' noOfLines={1}>
                      {result.title}
                    </Text>
                  </LinkOverlay>
                </Link>
              </HStack>
            </LinkBox>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Search;
