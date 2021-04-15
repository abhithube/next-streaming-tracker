import Image from 'next/image';
import { chakra } from '@chakra-ui/system';

export default chakra(Image, {
  shouldForwardProp: (prop) => ['src', 'alt', 'width', 'height'].includes(prop),
});
