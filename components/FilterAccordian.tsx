import { Dispatch, SetStateAction, useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

import Filter from './Filter';
import { Genre, Provider } from '../lib/types';
import { QueryDef } from '../pages/movie';

type FilterAccordianProps = {
  genreList: Genre[];
  providerList: Provider[];
  setPage: Dispatch<SetStateAction<number>>;
  setQuery: Dispatch<SetStateAction<QueryDef>>;
};

const FilterAccordian = ({
  genreList,
  providerList,
  setPage,
  setQuery,
}: FilterAccordianProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <Heading>
          <AccordionButton>
            <Text fontSize='xl' fontWeight='bold' mr={2}>
              Filters
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel mt={4}>
          <Flex direction='row' mb='4'>
            <Filter
              type='Genres'
              list={genreList}
              selected={genres}
              setSelected={setGenres}
            />
            <Filter
              type='Providers'
              list={providerList}
              selected={providers}
              setSelected={setProviders}
            />
          </Flex>
          <Button
            onClick={() => {
              setQuery({ genres, providers });
              setPage(1);
            }}
            w='100%'
            colorScheme='red'
          >
            Go!
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterAccordian;
