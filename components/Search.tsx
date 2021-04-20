import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, HStack, Input, Text, VStack } from '@chakra-ui/react';

import useDebounce from '../lib/hooks/useDebounce';
import useSearch from '../lib/hooks/useSearch';
import { SearchResult } from '../lib/types';
import { IMAGE_URL } from '../lib/constants';

const Search = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [shouldShow, setShouldShow] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data } = useSearch(debouncedSearch);

  useEffect(() => {
    if (data) {
      setResults(data.slice(0, 5));
      setShouldShow(true);
    }
  }, [data]);

  useEffect(() => {
    if (debouncedSearch.length === 0) setResults([]);
  }, [debouncedSearch]);

  return (
    <Box>
      <Input
        w='500px'
        bgColor='white'
        color='black'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setShouldShow(true)}
        onBlur={() => setShouldShow(false)}
        placeholder='Search movies or TV shows...'
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
        >
          {results.map((result, index) => (
            <HStack
              key={index}
              px='2'
              py='1'
              onMouseDown={() => {
                setSearch('');
                router.push(`/${result.type}/${result.id}`);
              }}
              _hover={{ cursor: 'pointer' }}
            >
              <Image
                src={IMAGE_URL + result.posterPath}
                alt={result.title}
                width='30'
                height='45'
              />
              <Text as='span' noOfLines={1}>
                {result.title}
              </Text>
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Search;
