import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { Genre, Provider } from '../lib/types';
import Filter from './Filter';

type FilterAccordianProps = {
  genreList: Genre[];
  providerList: Provider[];
};

const FilterAccordian = ({ genreList, providerList }: FilterAccordianProps) => {
  const router = useRouter();

  const [genres, setGenres] = useState<number[]>([]);
  const [providers, setProviders] = useState<number[]>([]);

  useEffect(() => {
    if (router.query.genres)
      setGenres(
        String(router.query.genres)
          .split(',')
          .map(id => Number(id))
      );
    else setGenres([]);

    if (router.query.providers)
      setProviders(
        String(router.query.providers)
          .split('|')
          .map(id => Number(id))
      );
    else setProviders([]);
  }, [router.query]);

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
          <ButtonGroup w='100%'>
            <Button
              onClick={() => {
                router.push(
                  {
                    query: {
                      ...router.query,
                      genres: '',
                      providers: '',
                      page: 1,
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
              w='50%'
              colorScheme='red'
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                router.push(
                  {
                    query: {
                      ...router.query,
                      genres: genres.sort().join(','),
                      providers: providers.sort().join('|'),
                      page: 1,
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
              w='50%'
              colorScheme='green'
            >
              Go
            </Button>
          </ButtonGroup>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterAccordian;
