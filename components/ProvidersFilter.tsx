import { Button, HStack } from '@chakra-ui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { SUPPORTED_PROVIDERS } from '../lib/constants';
import { Provider } from '../lib/types';

type ProvidersFilterProps = {
  providers: Provider[];
  setProviders: Dispatch<SetStateAction<any[]>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const ProvidersFilter = ({
  providers,
  setProviders,
  setPage,
}: ProvidersFilterProps) => {
  const onClick = (provider: Provider) => {
    setPage(1);
    if (providers.length === SUPPORTED_PROVIDERS.length) {
      setProviders([provider]);
      return;
    }
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
    <HStack>
      {SUPPORTED_PROVIDERS.map((provider) => (
        <Fragment key={provider.id}>
          <Button
            colorScheme={providers.includes(provider) ? 'blue' : 'gray'}
            onClick={() => onClick(provider)}
          >
            {provider.name}
          </Button>
        </Fragment>
      ))}
    </HStack>
  );
};

export default ProvidersFilter;
