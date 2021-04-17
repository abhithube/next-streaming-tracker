import { Box, Button, Heading, HStack } from '@chakra-ui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';

import { Provider } from '../lib/types';

type ProvidersFilterProps = {
  providerList: Provider[];
  providers: Provider[];
  setProviders: Dispatch<SetStateAction<any[]>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const ProvidersFilter = ({
  providerList,
  providers,
  setProviders,
  setPage,
}: ProvidersFilterProps) => {
  const onClick = (provider: Provider) => {
    setPage(1);

    let newProviders = providers.slice();
    if (providers.includes(provider)) {
      newProviders = newProviders.filter(({ id }) => id !== provider.id);
      setProviders(newProviders);
    } else {
      newProviders.push(provider);
      setProviders(newProviders);
    }
  };

  return (
    <Box>
      <Heading as='h3' fontSize='xl'>
        Streaming Services
      </Heading>
      <HStack>
        {providerList.map((provider) => (
          <Fragment key={provider.id}>
            <Button
              onClick={() => onClick(provider)}
              colorScheme={providers.includes(provider) ? 'blue' : 'gray'}
              m='2'
            >
              {provider.name}
            </Button>
          </Fragment>
        ))}
      </HStack>
    </Box>
  );
};

export default ProvidersFilter;
