import Image from 'next/image';
import { chakra } from '@chakra-ui/system';

export default chakra(Image, {
  shouldForwardProp: (prop) => ['width', 'height', 'src'].includes(prop),
});
