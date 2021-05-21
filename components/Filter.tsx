import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { Genre } from '../lib/types';

type FilterProps = {
  type: string;
  list: Genre[];
  selected: number[];
  setSelected: Dispatch<SetStateAction<any[]>>;
};

const Filter = ({ type, list, selected, setSelected }: FilterProps) => {
  const handleClick = (id: number) => {
    let newSelected = selected.slice();
    if (selected.includes(id)) {
      newSelected = newSelected.filter(nid => nid !== id);
      setSelected(newSelected);
    } else {
      newSelected.push(id);
      setSelected(newSelected);
    }
  };

  return (
    <Box flexBasis='50%'>
      <Heading as='h3' fontSize='lg' fontWeight='semibold'>
        {type}
      </Heading>
      <Divider my='4' w='90%' />
      <Flex flexWrap='wrap'>
        {list.map(item => (
          <Fragment key={item.id}>
            <Button
              onClick={() => handleClick(item.id)}
              colorScheme={selected.includes(item.id) ? 'blue' : 'gray'}
              mr='4'
              mb='4'
            >
              {item.name}
            </Button>
          </Fragment>
        ))}
      </Flex>
    </Box>
  );
};

export default Filter;
