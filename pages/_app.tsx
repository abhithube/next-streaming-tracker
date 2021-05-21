import { Box, ChakraProvider, CSSReset } from '@chakra-ui/react';
import axios from 'axios';
import { AppProps } from 'next/app';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../global.css';
import theme from '../theme';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.params = { api_key: process.env.NEXT_PUBLIC_API_KEY };

const App = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: { queries: { refetchOnWindowFocus: false } },
    });
  }

  return (
    <Box minH='100%' pos='relative'>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <Navbar />
            <Box pt='16'>
              <Component {...pageProps} />
              <ReactQueryDevtools
                initialIsOpen={false}
                position='bottom-right'
              />
            </Box>
            <Footer />
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </Box>
  );
};

export default App;
