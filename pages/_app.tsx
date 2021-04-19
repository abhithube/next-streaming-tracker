import axios from 'axios';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Box, ChakraProvider, CSSReset } from '@chakra-ui/react';

import Navbar from '../components/Navbar';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.params = { api_key: process.env.NEXT_PUBLIC_API_KEY };

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <CSSReset />
        <Navbar />
        <Box pt='16'>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
