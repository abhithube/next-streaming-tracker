import '../styles/globals.css';
import axios from 'axios';
import Navbar from '../components/Navbar';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.params = {
  api_key: process.env.NEXT_PUBLIC_API_KEY,
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
