import { Dispatch, Fragment, SetStateAction } from 'react';
import { Button, Flex, HStack } from '@chakra-ui/react';

import { Genre } from '../lib/types';

type GenresFilterProps = {
  genreList: Genre[];
  genres: Genre[];
  setGenres: Dispatch<SetStateAction<Genre[]>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const GenresFilter = ({
  genreList,
  genres,
  setGenres,
  setPage,
}: GenresFilterProps) => {
  const onClick = (genre: Genre) => {
    setPage(1);

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
    <Flex flexWrap='wrap'>
      {genreList.map((genre) => (
        <Fragment key={genre.id}>
          <Button
            onClick={() => onClick(genre)}
            colorScheme={genres.includes(genre) ? 'blue' : 'gray'}
            m='2'
          >
            {genre.name}
          </Button>
        </Fragment>
      ))}
    </Flex>
  );
};

export default GenresFilter;
