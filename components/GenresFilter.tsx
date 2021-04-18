import { Dispatch, Fragment, SetStateAction } from 'react';
import { Box, Button, Divider, Flex, Heading, HStack } from '@chakra-ui/react';

import { Genre } from '../lib/types';

type GenresFilterProps = {
  genreList: Genre[];
  genres: Genre[];
  setGenres: Dispatch<SetStateAction<Genre[]>>;
};

const GenresFilter = ({ genreList, genres, setGenres }: GenresFilterProps) => {
  const onClick = (genre: Genre) => {
    let newGenres = genres.slice();
    if (genres.includes(genre)) {
      newGenres = newGenres.filter(({ id }) => id !== genre.id);
      setGenres(newGenres);
    } else {
      newGenres.push(genre);
      setGenres(newGenres);
    }
  };
  return (
    <Box flexBasis='50%'>
      <Heading as='h3' fontSize='xl'>
        Genres
      </Heading>
      <Divider my='4' w='90%' />
      <Flex flexWrap='wrap'>
        {genreList.map((genre) => (
          <Fragment key={genre.id}>
            <Button
              onClick={() => onClick(genre)}
              colorScheme={genres.includes(genre) ? 'blue' : 'gray'}
              mr='4'
              mb='4'
            >
              {genre.name}
            </Button>
          </Fragment>
        ))}
      </Flex>
    </Box>
  );
};

export default GenresFilter;
