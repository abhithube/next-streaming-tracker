import axios from 'axios';
import { AppProps } from 'next/app';
import { Box, ChakraProvider, CSSReset } from '@chakra-ui/react';

import Navbar from '../components/Navbar';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.params = { api_key: process.env.NEXT_PUBLIC_API_KEY };

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Navbar />
      <Box pt='16'>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
