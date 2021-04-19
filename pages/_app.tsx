import axios from 'axios';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Box, ChakraProvider, CSSReset } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import '../global.css';
import Footer from '../components/Footer';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.params = { api_key: process.env.NEXT_PUBLIC_API_KEY };

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });
  return (
    <Box minH='100%' pos='relative'>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <CSSReset />
          <Navbar />
          <Box pt='16'>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
          </Box>
          <Footer />
        </QueryClientProvider>
      </ChakraProvider>
    </Box>
  );
};

export default App;
