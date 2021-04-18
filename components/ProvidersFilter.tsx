import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';

import { Provider } from '../lib/types';

type ProvidersFilterProps = {
  providerList: Provider[];
  providers: Provider[];
  setProviders: Dispatch<SetStateAction<any[]>>;
};

const ProvidersFilter = ({
  providerList,
  providers,
  setProviders,
}: ProvidersFilterProps) => {
  const onClick = (provider: Provider) => {
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
    <Box flexBasis='50%'>
      <Heading as='h3' fontSize='xl'>
        Services
      </Heading>
      <Divider my='4' w='90%' />
      <Flex flexWrap='wrap'>
        {providerList.map((provider) => (
          <Fragment key={provider.id}>
            <Button
              onClick={() => onClick(provider)}
              colorScheme={providers.includes(provider) ? 'blue' : 'gray'}
              mr='4'
              mb='4'
            >
              {provider.name}
            </Button>
          </Fragment>
        ))}
      </Flex>
    </Box>
  );
};

export default ProvidersFilter;
