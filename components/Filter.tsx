import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';

type FilterProps = {
  type: string;
  list: any[];
  selected: any[];
  setSelected: Dispatch<SetStateAction<any[]>>;
};

const Filter = ({ type, list, selected, setSelected }: FilterProps) => {
  const onClick = (item: any) => {
    let newSelected = selected.slice();
    if (selected.includes(item)) {
      newSelected = newSelected.filter(({ id }) => id !== item.id);
      setSelected(newSelected);
    } else {
      newSelected.push(item);
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
              onClick={() => onClick(item)}
              colorScheme={selected.includes(item) ? 'red' : 'gray'}
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
